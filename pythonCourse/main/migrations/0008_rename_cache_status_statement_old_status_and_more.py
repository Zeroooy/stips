# Generated by Django 5.1.1 on 2025-02-28 08:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_rename_cashe_status_statement_cache_status_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='statement',
            old_name='cache_status',
            new_name='old_status',
        ),
        migrations.AddField(
            model_name='statement',
            name='urls',
            field=models.JSONField(blank=True, default=list, verbose_name='Json'),
        ),
        migrations.AlterField(
            model_name='log',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2025, 2, 28, 11, 58, 24, 94356), verbose_name='Дата'),
        ),
        migrations.AlterField(
            model_name='statement',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2025, 2, 28, 11, 58, 24, 93357), verbose_name='Дата'),
        ),
    ]
