# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import csv

from django.http import HttpResponse, StreamingHttpResponse
from django.shortcuts import get_object_or_404

from rest_framework import viewsets

from weather.models import Station
from weather.serializers import StationSerializer

def index(request):
    return HttpResponse('Hello, World!')


class StationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationSerializer

class Echo:
    """An object that implements just the write method of the file-like
    interface.
    """
    def write(self, value):
        """Write the value by returning it, instead of storing in a buffer."""
        return value


def aggregatedData(request, station_id):
    queryset = Station.objects.all()
    station = get_object_or_404(queryset, pk=station_id)

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="{}.csv"'.format(station.name.replace(' ', ''))

    writer = csv.writer(response)
    writer.writerow(['date', 'max_temp', 'min_temp', 'mean_temp', 'rain', 'snow', 'total_percipitation', 'snow_on_ground'])
    for record in station.dailyrecord_set.all():
        writer.writerow([
            record.date,
            record.max_temp,
            record.min_temp,
            record.mean_temp,
            record.rain,
            record.snow,
            record.total_percipitation,
            record.snow_on_ground,
        ])
    return response
