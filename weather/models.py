# -*- coding: utf-8 -*-


from django.db import models


class Station(models.Model):
    CANADIAN_GOVERNMENT = "GC"
    CLIMATE_DATA = "CD"
    GLOBAL_HISTORICAL_CLIMATOLOGY_NETWORK = "GHCND"
    SOURCE_CHOICES = (
        (CANADIAN_GOVERNMENT, "Environment Canada"),
        (CLIMATE_DATA, "Climate Data"),
        (GLOBAL_HISTORICAL_CLIMATOLOGY_NETWORK, "Global Historical Climatology Network")
    )

    source = models.CharField(max_length=10, choices=SOURCE_CHOICES)
    name = models.CharField(max_length=255, default='')
    station_id = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=20, decimal_places=12, null=True)
    longitude = models.DecimalField(max_digits=20, decimal_places=12, null=True)
    data_start = models.DateField(null=True)
    data_end = models.DateField(null=True)
    has_daily_data = models.BooleanField(default=False)
    daily_record_count = models.IntegerField(null=True)
    daily_temp_count = models.IntegerField(null=True)
    daily_percip_count = models.IntegerField(null=True)

    def __unicode__(self):
        return '{}: {}'.format(self.station_id, self.name)


class DailyRecord(models.Model):
    station = models.ForeignKey(Station)
    date = models.DateField()
    max_temp = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    min_temp = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    mean_temp = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    rain = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    snow = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    total_percipitation = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    snow_on_ground = models.DecimalField(max_digits=5, decimal_places=2, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['station', 'date'])
        ]


class Project(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField()
    default_zoom = models.IntegerField(null=True, blank=True)
    private = models.BooleanField(default=True)

    def __unicode__(self):
        return self.name


class ProjectGrouping(models.Model):
    name = models.CharField(max_length=256)
    stations = models.ManyToManyField(Station)
    project = models.ForeignKey(Project, related_name='groupings')
    description = models.TextField()
    trend_line_high = models.IntegerField(null=True)
    trend_line_low = models.IntegerField(null=True)

    def __unicode__(self):
        return "{}: {}".format(self.project.name, self.name)
