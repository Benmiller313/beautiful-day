from django.core.management.base import BaseCommand

from weather.data_loaders import gc

class Command(BaseCommand):
    help = 'Add Aggregates to GC Station data'

    def handle(self, *args, **kwargs):

        gc.denormalize()
