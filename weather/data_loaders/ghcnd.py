from datetime import date

from weather.models import Station, DailyRecord


def _parse_stattion_file_line(line):

    station_id = line[0:11].strip()
    lat = line[12:20].strip()
    lon = line[21:30].strip()
    state = line[38:40].strip()
    name = line[41:71].strip()

    return station_id, lat, lon, state, name

def load_stations(country_code=None, state_code=None):
    """
    Loads stations from the Global Historic Climate Network daily record set
    https://www1.ncdc.noaa.gov/pub/data/cdo/documentation/GHCND_documentation.pdf

    Stations come from the ghcnd-stations.csv included in this repository, downloaded initially from:
    https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/ghcnd-stations.txt

    ghcnd-stations.txt format:
        ------------------------------
        Variable   Columns   Type
        ------------------------------
        ID            1-11   Character
        LATITUDE     13-20   Real
        LONGITUDE    22-30   Real
        ELEVATION    32-37   Real
        STATE        39-40   Character
        NAME         42-71   Character
        GSN FLAG     73-75   Character
        HCN/CRN FLAG 77-79   Character
        WMO ID       81-85   Character
        ------------------------------

    """

    with open('ghcnd-stations.csv', 'rb') as raw_file:
        for line in raw_file:
            station_id, lat, lon, state, name = _parse_stattion_file_line(line)
            if state == state_code:
                station, _ = Station.objects.get_or_create(
                    source=Station.GLOBAL_HISTORICAL_CLIMATOLOGY_NETWORK,
                    station_id=station_id,
                )
                station.name = name
                station.latitude = lat
                station.longitude = lon
                station.save()
                load_daily(station)


def _read_month_row_meta(month_row):
    year = month_row[11:15]
    month = month_row[15:17]
    element = month_row[17:21]
    return year, month, element

def _parse_values(month_row):
    values = month_row[21:]
    parsed_values = []
    for i in range(0, 31):
        raw_value = values[i*8:i*8+5].strip()
        temp_value = float(raw_value) / 10 if raw_value != "-9999" else None
        parsed_values.append(temp_value)
    return parsed_values

def _load_month_row(month_row, month_records, station):
    year, month, element = _read_month_row_meta(month_row)
    if element == "TMAX" or element=="TMIN":
        values = _parse_values(month_row)
        for day, value in enumerate(values):
            if value is None:
                continue
            if day+1 in month_records:
                record = month_records[day+1]
            else:
                record = DailyRecord(station=station, date=date(int(year), int(month), day+1))
                month_records[day+1] = record
            if element == "TMAX":
                record.max_temp = value
            elif element == "TMIN":
                record.min_temp = value
        return record

def _publish_month(station, month, year, month_records):
    if not month_records:
        return []
    record_list = list(month_records.values())
    station.daily_temp_count += len(record_list)
    station.daily_record_count += len(record_list)
    return record_list

def load_daily(station, start_year=None, end_year=None):
    """
    Load daily data from ghcnd data set.
    Data is downloaded from https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/ghcnd_all.tar.gz and saved to
        ~/Downloads/ghcnd_all/ghcnd_all/<station_id>.dly

    Format of the .dly files:
    ------------------------------
    Variable   Columns   Type
    ------------------------------
    ID            1-11   Character
    YEAR         12-15   Integer
    MONTH        16-17   Integer
    ELEMENT      18-21   Character
    VALUE1       22-26   Integer
    MFLAG1       27-27   Character
    QFLAG1       28-28   Character
    SFLAG1       29-29   Character
    VALUE2       30-34   Integer
    MFLAG2       35-35   Character
    QFLAG2       36-36   Character
    SFLAG2       37-37   Character
      .           .          .
      .           .          .
      .           .          .
    VALUE31    262-266   Integer
    MFLAG31    267-267   Character
    QFLAG31    268-268   Character
    SFLAG31    269-269   Character
    ------------------------------

    """
    records = []
    with open('ghcnd_all/{}.dly'.format(station.station_id)) as raw_file:
        print("clearing for {}".format(station.name))
        station.has_daily_data = False
        station.daily_record_count = 0
        station.daily_temp_count = 0
        DailyRecord.objects.filter(station=station).delete()
        current_month_records = {}
        previous_month = -1
        previous_year = -1
        first_record = None

        for line in raw_file:
            year, month, element = _read_month_row_meta(line)
            if month != previous_month and previous_month != -1 and current_month_records:
                records += _publish_month(station, previous_month, previous_year, current_month_records)
                current_month_records = {}
                station.has_daily_data = True

            previous_month = month
            previous_year = year

            record = _load_month_row(line, current_month_records, station)
            if record and not first_record:
                station.data_start = record.date
                first_record = True
            if record:
                station.data_end = record.date

        print "Saving", station.station_id, station.data_start, station.data_end
        try:
            DailyRecord.objects.bulk_create(records)
        except Exception as e:
            print(e, station.station_id)

        station.save()

