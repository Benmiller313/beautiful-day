# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-10-06 22:05


from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weather', '0002_auto_20181004_0052'),
    ]

    operations = [
        migrations.AddField(
            model_name='station',
            name='first_year',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='station',
            name='last_year',
            field=models.DateField(null=True),
        ),
    ]
