from django.core.management.base import BaseCommand

from weather.data_loaders import ghcnd

class Command(BaseCommand):
    help = 'Loads all climate data from noaa GHCND dataset'


    def add_arguments(self, parser):
        parser.add_argument('state', type=str)


    def handle(self, *args, **kwargs):
        state = kwargs['state']
        ghcnd.load_stations(state_code=state)
