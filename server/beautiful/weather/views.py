# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from rest_framework import viewsets

from weather.models import Station
from weather.serializers import StationSerializer

def index(request):
    return HttpResponse('Hello, World!')


class StationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationSerializer