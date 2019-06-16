# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import csv
import re

from django.db import connection
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import get_object_or_404

from rest_framework import viewsets

from weather.models import Project, Station
from weather.serializers import StationSerializer, ProjectSerializer


def index(request):
    return HttpResponse('Hello, World!')


class StationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        print self.request.user
        if self.request.user.is_authenticated():
            return Project.objects.all()
        return Project.objects.filter(private=False)


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


def _generate_column_names(stations, columns=['max', 'min', 'mean']):
    names = []
    if 'max' in columns:
        names.append('{name}_{id}.max_temp')
    if 'min' in columns:
        names.append('{name}_{id}.min_temp')
    if 'mean' in columns:
        names.append('{name}_{id}.mean_temp')
    template = ', '.join(names)
    return [
        template.format(
            name=re.sub('[\W_]+', '', station.name),
            id=station.id
        ) for station in stations
    ]

def _generate_combined_stations_sql(stations, columns=['max', 'min', 'mean']):
    station_names = [(re.sub('[\W_]+', '', station.name), station.id) for station in stations]
    date_from = min([station.data_start for station in stations])
    date_to = max([station.data_end for station in stations])

    station_columns = _generate_column_names(stations, columns)

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

def combinedGraph(request):
    station_ids = request.GET.get('station_ids', '').split(',')
    columns = request.GET.get('columns', '').split(',')
    stations = Station.objects.filter(id__in=station_ids)
    if stations.count() < 1:
        raise Http404('Stations do not exist')

    sql = _generate_combined_stations_sql(stations, columns)
    with connection.cursor() as cursor:
        cursor.execute(sql)
        rows = cursor.fetchall()
        return JsonResponse(data={'data': rows})
