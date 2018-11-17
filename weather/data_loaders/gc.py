import csv
from datetime import date
from weather.models import Station


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
            station.name=row[NAME]
            station.latitude=row[LATITUDE]
            station.longitude=row[LONGITUDE]
            station.data_start=date(year=int(row[FIRST_YEAR]), month=1, day=1)
            station.data_end=date(year=int(row[LAST_YEAR]), month=12, day=31)
            station.save()
