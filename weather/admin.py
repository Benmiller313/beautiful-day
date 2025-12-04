# -*- coding: utf-8 -*-


from django.contrib import admin

from .models import Project, ProjectGrouping, DataLoadLog

admin.site.site_header = 'Beautiful Day Administration'

admin.site.register(Project)


class ProjectGroupingAdmin(admin.ModelAdmin):
    filter_horizontal = ('stations', )

admin.site.register(ProjectGrouping, ProjectGroupingAdmin)


@admin.register(DataLoadLog)
class DataLoadLogAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'source',
        'status',
        'load_from_date',
        'load_to_date',
        'stations_processed',
        'stations_skipped',
        'stations_failed',
        'records_created',
        'started_at',
        'completed_at',
    )
    list_filter = ('status', 'source')
    ordering = ('-started_at',)
    readonly_fields = (
        'source',
        'started_at',
        'completed_at',
        'status',
        'load_from_date',
        'load_to_date',
        'stations_processed',
        'stations_skipped',
        'stations_failed',
        'records_created',
        'error_message',
    )
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False
