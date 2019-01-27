from rest_framework import serializers

from weather.models import Station


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = (
            'id',
            'source',
            'name',
            'station_id',
            'latitude',
            'longitude',
            'data_start',
            'data_end',
            'has_daily_data',
        )
