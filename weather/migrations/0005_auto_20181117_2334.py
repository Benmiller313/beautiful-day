# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-11-17 23:34


from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weather', '0004_auto_20181006_2225'),
    ]

    operations = [
        migrations.AlterField(
            model_name='station',
            name='latitude',
            field=models.DecimalField(decimal_places=12, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='station',
            name='longitude',
            field=models.DecimalField(decimal_places=12, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='station',
            name='name',
            field=models.CharField(default='', max_length=255),
        ),
    ]
