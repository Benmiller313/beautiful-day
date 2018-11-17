from django.conf.urls import url, include
from rest_framework import routers


from weather import views


router = routers.DefaultRouter()
router.register('stations', views.StationViewSet)


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^', include(router.urls))
]
