from django.core.management.base import BaseCommand

from ...models import Station

class Command(BaseCommand):
    help = 'Loads all climate data from Environment Canada'

    def handle(self, *args, **kwargs):
        pass
