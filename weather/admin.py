# -*- coding: utf-8 -*-


from django.contrib import admin

from .models import Project, ProjectGrouping

admin.site.site_header = 'Beautiful Day Administration'

admin.site.register(Project)


class ProjectGroupingAdmin(admin.ModelAdmin):
    filter_horizontal = ('stations', )

admin.site.register(ProjectGrouping, ProjectGroupingAdmin)
