import csv
from datetime import date
from contextlib import closing
from codecs import iterdecode

import requests
from django.db.models import (
    Sum,
    Case,
    Count,
    IntegerField,
    When,
    Max, Min, Q)
from django.utils import timezone

import io

from weather.models import Station, DailyRecord, DataLoadLog

# Stations with data ending before this year are considered inactive
ACTIVE_STATION_CUTOFF_YEAR = 2000


def download_csv(url):
    response = requests.get(url)


def val_or_none(val):
    return val if val else None


def load_daily(station, start_year=None, end_year=None):
    url = 'http://climate.weather.gc.ca/climate_data/bulk_data_e.html' \
          '?format=csv&stationID={station_id}&Year={year}&timeframe=2&submit=Download+Data'

    header_rows = 2

    DATE = 4
    YEAR = 5
    MONTH = 6
    DAY = 7
    DATA_QUALITY = 8
    MAX_TEMP = 9
    MAX_TEMP_FLAG = 10
    MIN_TEMP = 11
    MIN_TEMP_FLAG = 12
    MEAN_TEMP = 13
    MEAN_TEMP_FLAG = 14
    HEAT_DEG_DAYS = 15
    COOL_DEG_DAYS = 17
    TOTAL_RAIN = 19
    TOTAL_SNOW = 21
    TOTAL_PERCIP = 23
    SNOW_ON_GROUND = 25

    total = 0
    year = start_year if start_year else station.data_start.year
    year_to = end_year if end_year else station.data_end.year
    records = []
    retries = 0
    while (year <= year_to and retries < 5):
        print("Clearing Old Data for", station.id)
        DailyRecord.objects.filter(station_id=station.id, date__year=year).delete()
        print("Downloading", year)
        try:
            with closing(requests.get(url.format(year=year, station_id=station.station_id), stream=True)) as r:
                csv_data = io.StringIO(r.text)

                reader = csv.reader(csv_data)
                rows = 0
                print(url.format(year=year, station_id=station.station_id))
                for row in reader:
                    if rows < header_rows:
                        rows += 1
                        continue
                    try:
                        if row[MAX_TEMP] or row[MIN_TEMP] or row[MEAN_TEMP] or row[TOTAL_RAIN] or row[TOTAL_SNOW] or row[TOTAL_PERCIP] or row[SNOW_ON_GROUND]:
                            records.append(DailyRecord(
                                station=station,
                                date=date(
                                    year=int(row[YEAR]),
                                    month=int(row[MONTH]),
                                    day=int(row[DAY]),
                                ),
                                max_temp=val_or_none(row[MAX_TEMP]),
                                min_temp=val_or_none(row[MIN_TEMP]),
                                mean_temp=val_or_none(row[MEAN_TEMP]),
                                rain=val_or_none(row[TOTAL_RAIN]),
                                snow=val_or_none(row[TOTAL_SNOW]),
                                total_percipitation=val_or_none(row[TOTAL_PERCIP]),
                                snow_on_ground=val_or_none(row[SNOW_ON_GROUND]),
                            ))

                    except (ValueError, IndexError) as e:
                        print('Error in row:', row, e)
            year += 1
            retries = 0
        except Exception as e:
            retries += 1
            print('Error, retrying number', retries)
            print(e)

    if retries >= 5:
        print("Giving up loading station", station.id)

    DailyRecord.objects.bulk_create(records)
    print("added", len(records))
    total += len(records)
    if total:
        print("Sample record", records[0].date, records[0].max_temp)
        station.has_daily_data = True
        station.save()


def load_stations():
    """
    The station data lives inside this repository in a file gc_stations.csv.
    The column format of the file:
    [Name, Province, Climate ID, Station ID, WMO ID, TC ID, Latitude (Decimal Degrees), Longitude (Decimal Degrees), Latitude, Longitude, Elevation (m), First Year, Last Year, HLY First Year, HLY Last Year	DLY First Year	DLY Last Year	MLY First Year	MLY Last Year

    """
    NAME = 0
    STATION_ID = 3
    LATITUDE = 6
    LONGITUDE = 7
    ELEVATION = 10
    FIRST_YEAR = 11
    LAST_YEAR = 12

    with open('gc_stations.csv', 'rb') as raw_file:
        reader = csv.reader(raw_file, delimiter='\t')
        for row in reader:
            print(row)
            station, _ = Station.objects.get_or_create(source=Station.CANADIAN_GOVERNMENT, station_id=row[STATION_ID])
            if station.has_daily_data:
                continue
            station.name = row[NAME]
            station.latitude = row[LATITUDE]
            station.longitude = row[LONGITUDE]
            station.data_start = date(year=int(row[FIRST_YEAR]), month=1, day=1)
            station.data_end = date(year=int(row[LAST_YEAR]), month=12, day=31)
            station.save()
            if not station.has_daily_data:
                load_daily(station)

def denormalize_station(station):
    print("Denormalizing station", station.name)
    aggregates = Station.objects.filter(id=station.id).filter(Q(dailyrecord__max_temp__isnull=False) |  Q(dailyrecord__min_temp__isnull=False) |  Q(dailyrecord__mean_temp__isnull=False) |  Q(dailyrecord__rain__isnull=False) |  Q(dailyrecord__snow__isnull=False) | Q(dailyrecord__total_percipitation__isnull=False)).aggregate(
        num_records=Count('dailyrecord'),
        num_temp=Sum(
            Case(
                When(dailyrecord__max_temp__isnull=False, then=1),
                default=0,
                output_field=IntegerField(),
            ),
        ),
        num_percip=Sum(
            Case(
                When(dailyrecord__total_percipitation__isnull=False, then=1),
                default=0,
                output_field=IntegerField()
            )
        ),
        data_end=Max('dailyrecord__date'),
        data_start=Min('dailyrecord__date'),
    )
    station.daily_record_count = aggregates['num_records']
    station.daily_temp_count = aggregates['num_temp']
    station.daily_percip_count = aggregates['num_percip']
    if(aggregates['num_records'] and aggregates['num_records'] > 0):
        station.data_start = aggregates["data_start"]
        station.data_end = aggregates["data_end"]
    station.save()
    print(aggregates)
    print(station)

def denormalize(src='GC', station_ids=None):
    """
    Denormalize station aggregate data.
    
    Args:
        src: Source filter (default 'GC')
        station_ids: Optional list of station IDs to denormalize. 
                     If None, denormalizes all stations for the source.
    """
    if station_ids:
        stations = Station.objects.filter(id__in=station_ids)
        print(f"Denormalizing {len(station_ids)} updated stations")
    else:
        stations = Station.objects.filter(source=src)
        print(f"Denormalizing all {stations.count()} stations for source {src}")
    
    for station in stations:
        denormalize_station(station)


def load_stations_by_date(from_date, to_date):
    """Legacy function - loads all stations for year range."""
    stations = Station.objects.filter(source=Station.CANADIAN_GOVERNMENT)
    for station in stations:
        load_daily(station, from_date, to_date)


def get_active_stations():
    """
    Returns stations that are likely to still be reporting data.
    
    A station is considered "active" if its most recent data point 
    is from year 2000 or later.
    """
    cutoff_date = date(ACTIVE_STATION_CUTOFF_YEAR, 1, 1)
    return Station.objects.filter(
        source=Station.CANADIAN_GOVERNMENT,
        data_end__gte=cutoff_date
    )


def get_all_gc_stations():
    """Returns all GC stations regardless of activity."""
    return Station.objects.filter(source=Station.CANADIAN_GOVERNMENT)


def get_last_successful_load_date():
    """
    Returns the end date of the last successful data load, 
    or None if no successful load exists.
    """
    last_load = DataLoadLog.objects.filter(
        source=Station.CANADIAN_GOVERNMENT,
        status=DataLoadLog.SUCCESS
    ).first()
    
    if last_load:
        return last_load.load_to_date
    return None


def get_last_successful_load_time():
    """
    Returns the timestamp of when the last successful load completed,
    or None if no successful load exists.
    """
    last_load = DataLoadLog.objects.filter(
        source=Station.CANADIAN_GOVERNMENT,
        status=DataLoadLog.SUCCESS
    ).first()
    
    if last_load:
        return last_load.completed_at
    return None


def load_daily_range(station, from_date, to_date):
    """
    Load daily records for a station within a date range.
    
    This method:
    1. Only deletes records within the specified date range
    2. Downloads data year by year (API limitation)
    3. Filters to only save records within the date range
    
    Returns the number of records created.
    """
    url = 'http://climate.weather.gc.ca/climate_data/bulk_data_e.html' \
          '?format=csv&stationID={station_id}&Year={year}&timeframe=2&submit=Download+Data'

    header_rows = 2

    DATE = 4
    YEAR = 5
    MONTH = 6
    DAY = 7
    DATA_QUALITY = 8
    MAX_TEMP = 9
    MAX_TEMP_FLAG = 10
    MIN_TEMP = 11
    MIN_TEMP_FLAG = 12
    MEAN_TEMP = 13
    MEAN_TEMP_FLAG = 14
    HEAT_DEG_DAYS = 15
    COOL_DEG_DAYS = 17
    TOTAL_RAIN = 19
    TOTAL_SNOW = 21
    TOTAL_PERCIP = 23
    SNOW_ON_GROUND = 25

    # Delete existing records in the date range only
    print(f"Clearing data for station {station.id} from {from_date} to {to_date}")
    DailyRecord.objects.filter(
        station=station,
        date__gte=from_date,
        date__lte=to_date
    ).delete()

    records = []
    retries = 0

    # Iterate through years that overlap our date range
    for year in range(from_date.year, to_date.year + 1):
        print(f"Downloading {year} for station {station.station_id}")
        try:
            with closing(requests.get(url.format(year=year, station_id=station.station_id), stream=True)) as r:
                csv_data = io.StringIO(r.text)
                reader = csv.reader(csv_data)
                rows = 0

                for row in reader:
                    if rows < header_rows:
                        rows += 1
                        continue
                    try:
                        if row[MAX_TEMP] or row[MIN_TEMP] or row[MEAN_TEMP] or row[TOTAL_RAIN] or row[TOTAL_SNOW] or row[TOTAL_PERCIP] or row[SNOW_ON_GROUND]:
                            record_date = date(
                                year=int(row[YEAR]),
                                month=int(row[MONTH]),
                                day=int(row[DAY]),
                            )
                            # Only include records within our date range
                            if from_date <= record_date <= to_date:
                                records.append(DailyRecord(
                                    station=station,
                                    date=record_date,
                                    max_temp=val_or_none(row[MAX_TEMP]),
                                    min_temp=val_or_none(row[MIN_TEMP]),
                                    mean_temp=val_or_none(row[MEAN_TEMP]),
                                    rain=val_or_none(row[TOTAL_RAIN]),
                                    snow=val_or_none(row[TOTAL_SNOW]),
                                    total_percipitation=val_or_none(row[TOTAL_PERCIP]),
                                    snow_on_ground=val_or_none(row[SNOW_ON_GROUND]),
                                ))
                    except (ValueError, IndexError) as e:
                        print('Error in row:', row, e)
            retries = 0
        except Exception as e:
            retries += 1
            print(f'Error downloading year {year}, retry {retries}: {e}')
            if retries >= 5:
                raise Exception(f"Failed to load station {station.id} after 5 retries")

    DailyRecord.objects.bulk_create(records)
    print(f"Added {len(records)} records for station {station.id}")
    
    if records:
        station.has_daily_data = True
        station.save()
    
    return len(records)


def load_stations_by_date_range(from_date, to_date, active_only=True):
    """
    Load station data for a specific date range.
    
    Args:
        from_date: Start date (datetime.date)
        to_date: End date (datetime.date)
        active_only: If True, only process stations with recent data (default: True)
    
    Returns:
        Tuple of (DataLoadLog instance, list of updated station IDs)
    """
    # Create log entry
    load_log = DataLoadLog.objects.create(
        source=Station.CANADIAN_GOVERNMENT,
        load_from_date=from_date,
        load_to_date=to_date,
    )
    
    # Select stations
    if active_only:
        stations = get_active_stations()
        total_stations = get_all_gc_stations().count()
        load_log.stations_skipped = total_stations - stations.count()
    else:
        stations = get_all_gc_stations()
    
    print(f"Processing {stations.count()} stations (skipped {load_log.stations_skipped} inactive)")
    
    total_records = 0
    failed_stations = []
    updated_station_ids = []
    
    for station in stations:
        try:
            records_added = load_daily_range(station, from_date, to_date)
            total_records += records_added
            load_log.stations_processed += 1
            if records_added > 0:
                updated_station_ids.append(station.id)
        except Exception as e:
            print(f"Failed to load station {station.id}: {e}")
            failed_stations.append(station.id)
            load_log.stations_failed += 1
    
    # Update log entry
    load_log.completed_at = timezone.now()
    load_log.records_created = total_records
    
    if load_log.stations_failed == 0:
        load_log.status = DataLoadLog.SUCCESS
    elif load_log.stations_processed > 0:
        load_log.status = DataLoadLog.PARTIAL
        load_log.error_message = f"Failed stations: {failed_stations}"
    else:
        load_log.status = DataLoadLog.FAILED
    
    load_log.save()
    
    print(f"Load complete: {load_log.stations_processed} stations, {total_records} records")
    print(f"Stations with new data: {len(updated_station_ids)}")
    return load_log, updated_station_ids