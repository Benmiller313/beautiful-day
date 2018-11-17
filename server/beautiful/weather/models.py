# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Station(models.Model):
    CANADIAN_GOVERNMENT = "GC"
    SOURCE_CHOICES = (
        (CANADIAN_GOVERNMENT, "Environment Canada"),
    )

    source = models.CharField(max_length=2, choices=SOURCE_CHOICES)
    name = models.CharField(max_length=255)
    station_id = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=20, decimal_places=12)
    longitude = models.DecimalField(max_digits=20, decimal_places=12)
    data_start = models.DateField(null=True)
    data_end = models.DateField(null=True)