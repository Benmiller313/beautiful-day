# beautiful-day
Historical Weather Data App


## Setup

1. Install dependencies
2. Run migrations:
   ```bash
   python manage.py migrate
   ```


## Data Loading Commands

### Loading Environment Canada (GC) Data

The `gc_update` command loads weather data from Environment Canada for a specified date range.

#### Basic Usage

```bash
# Load data for a specific date range
python manage.py gc_update --from 2024-01-01 --to 2024-12-31

# Load data up to today from a start date
python manage.py gc_update --from 2024-01-01

# Auto-resume from last successful load (loads from last success to today)
python manage.py gc_update
```

#### Options

| Option | Description |
|--------|-------------|
| `--from YYYY-MM-DD` | Start date for data load. If omitted, resumes from last successful load. |
| `--to YYYY-MM-DD` | End date for data load. Defaults to today. |
| `--all-stations` | Process all stations including inactive ones. By default, only stations with data since 2000 are updated. |
| `--denormalize` | Run denormalization after loading to update aggregate statistics. |
| `--min-days N` | Minimum days since last successful load before running. Exits early if not enough time has passed. Useful for scheduled jobs. |

#### Examples

```bash
# Monthly update with denormalization (recommended for regular updates)
python manage.py gc_update --from 2024-11-01 --to 2024-11-30 --denormalize

# Auto-resume and denormalize (ideal for cron jobs)
python manage.py gc_update --denormalize

# Weekly scheduled job - runs daily but only executes if 7+ days since last load
python manage.py gc_update --min-days 7 --denormalize

# Full reload including inactive stations (use sparingly)
python manage.py gc_update --from 2020-01-01 --all-stations --denormalize
```

#### Active Station Filtering

By default, `gc_update` only processes "active" stations—those with data recorded since the year 2000. This significantly reduces load time since many stations in the database have not reported data in decades.

To include all stations (including inactive ones), use the `--all-stations` flag.

#### Load Tracking

Each data load is logged in the `DataLoadLog` model, which tracks:
- Date range loaded
- Number of stations processed/skipped/failed
- Total records created
- Success/failure status

This enables the auto-resume feature: when you run `gc_update` without a `--from` date, it automatically picks up from where the last successful load ended.


### Denormalizing Station Data

If you need to run denormalization separately:

```bash
# Denormalize all GC stations
python manage.py denormalize_stations

# Denormalize stations from a specific source
python manage.py denormalize_stations --src GC
```


## Recommended Update Workflow

### Automated Weekly Updates (Heroku Scheduler)

Set up Heroku Scheduler to run daily, but use `--min-days 7` to only execute weekly:

```bash
# Add the scheduler add-on
heroku addons:create scheduler:standard

# Open the scheduler dashboard
heroku addons:open scheduler
```

In the dashboard, add a job:
- **Command:** `python manage.py gc_update --min-days 7 --denormalize`
- **Frequency:** Daily
- **Time:** Pick an off-peak hour (e.g., 06:00 UTC)

The command will exit quickly on days when it hasn't been 7 days since the last successful load.

### Manual Updates

Run on the 1st of each month to load the previous month's data:

```bash
python manage.py gc_update --denormalize
```

This will:
1. Check the last successful load date
2. Load data from that date to today
3. Skip inactive stations (no data since 2000)
4. Run denormalization to update aggregates


### Database Backup

Before major data updates, back up your database:

```bash
pg_dump <db_connection_uri> > bddb-$(date +%Y%m%d).sql
```
