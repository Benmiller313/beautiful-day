from django.conf.urls import url, include
from rest_framework import routers


from weather import views


router = routers.DefaultRouter()
router.register(r'stations', views.StationViewSet)
router.register(r'project', views.ProjectViewSet, 'project')

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^', include(router.urls)),
    url(r'^stations/aggregatecombined', views.aggregateCombinedStations),
    url(r'^stations/graphcombined', views.combinedGraph),
    url(r'^stations/(?P<station_id>[0-9]+)/aggregated', views.aggregatedData),
    url(r'^stations/(?P<station_id>[0-9]+)/graph', views.stationGraph),
    url(r'^stations/(?P<station_id>[0-9]+)/rawtemp', views.rawDailyValues),
]
