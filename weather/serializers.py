from rest_framework import serializers

from weather.models import Project, ProjectGrouping, Station


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


class ProjectGroupingSerializer(serializers.ModelSerializer):
    stations = StationSerializer(many=True, read_only=True)
    class Meta:
        model = ProjectGrouping
        fields = (
            'name',
            'stations',
            'description',
        )


class ProjectSerializer(serializers.ModelSerializer):
    groupings = ProjectGroupingSerializer(many=True, read_only=True
                                          )
    class Meta:
        model = Project
        fields = (
            'id',
            'name',
            'description',
            'groupings',
        )