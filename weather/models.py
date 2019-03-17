# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Station(models.Model):
    CANADIAN_GOVERNMENT = "GC"
    SOURCE_CHOICES = (
        (CANADIAN_GOVERNMENT, "Environment Canada"),
    )

    source = models.CharField(max_length=2, choices=SOURCE_CHOICES)
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
