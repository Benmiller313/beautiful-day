# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import csv

from django.db import connection
from django.http import HttpResponse, JsonResponse, Http404
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
    for record in station.dailyrecord_set.all().order_by('-date'):
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


def _generate_column_names(stations):
    return [
        '{name}_{id}.max_temp, {name}_{id}.min_temp, {name}_{id}.mean_temp'.format(
            name=station.name.replace(' ', '_').replace('.', '').replace('/', '').replace('-', ''),
            id=station.id
        ) for station in stations
    ]

def _generate_combined_stations_sql(stations):
    station_names = [(station.name.replace(' ', '_').replace('.', '').replace('/', '').replace('-', ''), station.id) for station in stations]
    date_from = min([station.data_start for station in stations])
    date_to = max([station.data_end for station in stations])

    station_columns = _generate_column_names(stations)

    joins = [
        'LEFT JOIN weather_dailyrecord {name}_{id} on dates.dates={name}_{id}.date and {name}_{id}.station_id={id}'.format(
            name=station[0],
            id=station[1],
        ) for station in station_names
    ]

    return '''
        SELECT dates.dates, {station_columns} 
        FROM (
            SELECT dates::date FROM generate_series(
            '{date_from}', '{date_to}', '1 day'::interval
        ) dates ) AS dates
        {joins} ;
    '''.format(
        station_columns=','.join(station_columns),
        date_from=date_from,
        date_to=date_to,
        joins=" ".join(joins)
    )


def aggregateCombinedStations(request):
    station_ids = request.GET.get('station_ids', '').split(',')

    stations = Station.objects.filter(id__in=station_ids)
    if stations.count() < 1:
        raise Http404('Stations do not exist')

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="{}"'.format('AggregateData.csv')
    writer = csv.writer(response)
    writer.writerow(['date'] + reduce(lambda x,y: x + y.split(','), _generate_column_names(stations), []))

    sql = _generate_combined_stations_sql(stations)

    with connection.cursor() as cursor:
        cursor.execute(sql)
        for row in cursor.fetchall():
            writer.writerow(row)

    return response


def rawDailyValues(request, station_id):
    queryset = Station.objects.all()
    station = get_object_or_404(queryset, pk=station_id)

    sql = _generate_combined_stations_sql([station])

    with connection.cursor() as cursor:
        cursor.execute(sql)
        return JsonResponse(data={'data': [cursor.fetchall()]})


def stationGraph(request, station_id):
    queryset = Station.objects.all()
    station = get_object_or_404(queryset, pk=station_id)

    formatted = [[record.date, record.max_temp] for record in station.dailyrecord_set.all().order_by('date')]

    return JsonResponse(data={'data': formatted})
