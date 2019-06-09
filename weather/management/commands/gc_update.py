import datetime

from django.core.management.base import BaseCommand

from weather.data_loaders import gc

class Command(BaseCommand):
    help = 'Loads all climate data from Environment Canada'

    def add_arguments(self, parser):
        parser.add_argument('from', type=lambda s: datetime.datetime.strptime(s, '%Y'))
        parser.add_argument('to', type=lambda s: datetime.datetime.strptime(s, '%Y'))

    def handle(self, *args, **kwargs):
        from_date = kwargs['from']
        to_date = kwargs['to']
        gc.load_stations_by_date(from_date.year, to_date.year)
