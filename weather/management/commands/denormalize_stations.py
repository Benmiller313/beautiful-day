from django.core.management.base import BaseCommand

from weather.data_loaders import gc

class Command(BaseCommand):
    help = 'Add Aggregates to GC Station data'

    def add_arguments(self, parser):
        parser.add_argument('-s', '--src', type=str)


    def handle(self, *args, **kwargs):
        src = kwargs['src']
        if src:
            gc.denormalize(src=src)
        else:
            gc.denormalize()
