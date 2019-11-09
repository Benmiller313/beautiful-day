from django.core.management.base import BaseCommand

from weather.data_loaders import cd

class Command(BaseCommand):
    help = 'Loads a exported dataset from climatedata.ca'

    def add_arguments(self, parser):
        parser.add_argument('prefix', type=str)
        parser.add_argument('file_name', type=str)


    def handle(self, *args, **options):

        print 'loading ', options['file_name']
        cd.load_stations(options['file_name'], options['prefix'])
