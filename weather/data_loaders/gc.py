import csv
from datetime import date
from contextlib import closing

import requests
from django.db.models import (
    Sum,
    Case,
    Count,
    IntegerField,
    When,
)

from weather.models import Station, DailyRecord


def download_csv(url):
    response = requests.get(url)


def val_or_none(val):
    return val if val else None


def load_daily(station, start_year=None, end_year=None):
    url = 'http://climate.weather.gc.ca/climate_data/bulk_data_e.html' \
          '?format=csv&stationID={station_id}&Year={year}&timeframe=2&submit=Download+Data'

    header_rows = 25

    DATE = 0
    YEAR = 1
    MONTH = 2
    DAY = 3
    DATA_QUALITY = 4
    MAX_TEMP = 5
    MAX_TEMP_FLAG = 6
    MIN_TEMP = 7
    MIN_TEMP_FLAG = 8
    MEAN_TEMP = 9
    MEAN_TEMP_FLAG = 10
    HEAT_DEG_DAYS = 11
    COOL_DEG_DAYS = 13
    TOTAL_RAIN = 15
    TOTAL_SNOW = 17
    TOTAL_PERCIP = 19
    SNOW_ON_GROUND = 21

    total = 0
    year = start_year if start_year else station.data_start.year
    year_to = end_year if end_year else station.data_end.year
    records = []
    while (year <= year_to):
        print "Clearing Old Data"
        DailyRecord.objects.filter(station_id=station.id, date__year=year).delete()
        print "Downloading", year
        with closing(requests.get(url.format(year=year, station_id=station.station_id), stream=True)) as r:
            reader = csv.reader(r.iter_lines(), delimiter=',', quotechar='"')
            rows = 0
            print url.format(year=year, station_id=station.station_id)
            for row in reader:
                if rows < header_rows:
                    rows += 1
                    continue
                try:
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

                except ValueError as e:
                    print 'Error in row:', row, e

        year += 1
    DailyRecord.objects.bulk_create(records)
    print "added", len(records), "records"
    total += len(records)
    if total:
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
            print row
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


def denormalize():
    for station in Station.objects.filter(source='GC'):
        # This nasty aggregate is much better in Django 2
        # Maybe its time for python 3...
        print station.name
        aggregates = Station.objects.filter(id=station.id).aggregate(
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
            )
        )
        station.daily_record_count = aggregates['num_records']
        station.daily_temp_count = aggregates['num_temp']
        station.daily_percip_count = aggregates['num_percip']
        station.save()
        print aggregates


def load_stations_by_date(from_date, to_date):
    stations = Station.objects.all()
    for station in stations:
        load_daily(station, from_date, to_date)