# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-05-04 20:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weather', '0010_project_projectgrouping'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectgrouping',
            name='name',
            field=models.CharField(default='', max_length=256),
            preserve_default=False,
        ),
    ]