from django.conf.urls import url, include
from rest_framework import routers


from weather import views


router = routers.DefaultRouter()
router.register(r'stations', views.StationViewSet)

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^', include(router.urls)),
    url(r'^stations/(?P<station_id>[0-9]+)/aggregated', views.aggregatedData),
    url(r'^stations/(?P<station_id>[0-9]+)/graph', views.stationGraph),
]
