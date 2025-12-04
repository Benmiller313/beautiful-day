import datetime

from django.core.management.base import BaseCommand

from weather.data_loaders import gc


class Command(BaseCommand):
    help = 'Loads climate data from Environment Canada for a date range'

    def add_arguments(self, parser):
        parser.add_argument(
            '--from',
            type=lambda s: datetime.datetime.strptime(s, '%Y-%m-%d').date(),
            help='Start date (YYYY-MM-DD). If omitted, resumes from last successful load.'
        )
        parser.add_argument(
            '--to',
            type=lambda s: datetime.datetime.strptime(s, '%Y-%m-%d').date(),
            help='End date (YYYY-MM-DD). Defaults to today.'
        )
        parser.add_argument(
            '--all-stations',
            action='store_true',
            help='Process all stations, including inactive ones (default: only active stations)'
        )
        parser.add_argument(
            '--denormalize',
            action='store_true',
            help='Run denormalization after loading data'
        )
        parser.add_argument(
            '--min-days',
            type=int,
            default=0,
            help='Minimum days since last successful load before running. Exits early if not enough time has passed.'
        )

    def handle(self, *args, **kwargs):
        from_date = kwargs.get('from')
        to_date = kwargs.get('to') or datetime.date.today()
        all_stations = kwargs.get('all_stations', False)
        denormalize = kwargs.get('denormalize', False)
        min_days = kwargs.get('min_days', 0)

        # Check minimum days since last load
        if min_days > 0:
            last_load_time = gc.get_last_successful_load_time()
            if last_load_time:
                from django.utils import timezone
                days_since_last = (timezone.now() - last_load_time).days
                if days_since_last < min_days:
                    self.stdout.write(
                        f"Skipping: only {days_since_last} days since last load "
                        f"(minimum: {min_days} days)"
                    )
                    return

        # Auto-resume from last successful load if no from_date specified
        if not from_date:
            from_date = gc.get_last_successful_load_date()
            if from_date:
                # Start from the day after the last successful load
                from_date = from_date + datetime.timedelta(days=1)
                self.stdout.write(f"Resuming from last successful load: {from_date}")
            else:
                self.stderr.write(
                    "No previous load found. Please specify --from date.\n"
                    "Example: python manage.py gc_update --from 2024-01-01"
                )
                return

        if from_date > to_date:
            self.stdout.write(self.style.SUCCESS(
                f"Already up to date (last load: {from_date - datetime.timedelta(days=1)})"
            ))
            return

        self.stdout.write(f"Loading data from {from_date} to {to_date}")
        
        if all_stations:
            self.stdout.write("Processing ALL stations (including inactive)")
        else:
            self.stdout.write("Processing only active stations (data since 2000)")

        load_log, updated_station_ids = gc.load_stations_by_date_range(
            from_date, 
            to_date, 
            active_only=not all_stations
        )

        if load_log.status == gc.DataLoadLog.SUCCESS:
            self.stdout.write(self.style.SUCCESS(
                f"Successfully loaded {load_log.records_created} records "
                f"from {load_log.stations_processed} stations"
            ))
        elif load_log.status == gc.DataLoadLog.PARTIAL:
            self.stdout.write(self.style.WARNING(
                f"Partial success: {load_log.records_created} records from "
                f"{load_log.stations_processed} stations "
                f"({load_log.stations_failed} stations failed)"
            ))
        else:
            self.stdout.write(self.style.ERROR("Load failed"))

        if denormalize:
            if updated_station_ids:
                self.stdout.write(f"Denormalizing {len(updated_station_ids)} updated stations...")
                gc.denormalize(station_ids=updated_station_ids)
                self.stdout.write(self.style.SUCCESS("Denormalization complete"))
            else:
                self.stdout.write("No stations to denormalize (no new data loaded)")
