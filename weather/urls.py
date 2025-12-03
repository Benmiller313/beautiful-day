from django.urls import re_path, include
from rest_framework import routers


from weather import views


router = routers.DefaultRouter()
router.register(r'stations', views.StationViewSet)
router.register(r'project', views.ProjectViewSet, 'project')

urlpatterns = [
    re_path(r'^$', views.index, name='index'),
    re_path(r'^', include(router.urls)),
    re_path(r'^stations/aggregatecombined', views.aggregateCombinedStations),
    re_path(r'^stations/graphcombined', views.combinedGraph),
    re_path(r'^stations/(?P<station_id>[0-9]+)/aggregated', views.aggregatedData),
    re_path(r'^stations/(?P<station_id>[0-9]+)/graph', views.stationGraph),
    re_path(r'^stations/(?P<station_id>[0-9]+)/rawtemp', views.rawDailyValues),
]
