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
            'daily_record_count',
            'daily_temp_count',
            'daily_percip_count',
        )
