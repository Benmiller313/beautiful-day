from django.core.management.base import BaseCommand

from weather.data_loaders import gc

class Command(BaseCommand):
    help = 'Loads all climate data from Environment Canada'

    def handle(self, *args, **kwargs):
        gc.load_stations()
