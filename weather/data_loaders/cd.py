import csv
import datetime

from weather.models import Station, DailyRecord

def load_stations(file_name, station_prefix):
    """
    Loads data exported from the climatedata.ca
    Each Model is imported as a seperate station in to the database.
    """
    with open(file_name, 'rb') as f:
        reader = csv.DictReader(f)
        for row in reader:
            print(row)
            date = datetime.datetime.strptime(row.pop(''), '%Y-%m-%d %H:%M:%S').date()
            lat = row.pop('lat')
            lon = row.pop('lon')
            if not lat or not lon:
                print('no lat lon skipping row')
                continue
            for station_name in row:
                name = station_prefix + " " + station_name
                station, _ = Station.objects.get_or_create(
                    source=Station.CLIMATE_DATA,
                    name=name,
                )
                station.latitude = lat
                station.longitude = lon
                if not station.data_end or date > station.data_end:
                    station.data_end = date
                if not station.data_start or date < station.data_start:
                    station.data_start = date
                station.save()
                record, _ = DailyRecord.objects.get_or_create(station=station, date=date)
                if row[station_name] != '':
                    record.max_temp = row[station_name]
                    record.save()