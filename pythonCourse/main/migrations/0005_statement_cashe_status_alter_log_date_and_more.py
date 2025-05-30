# Generated by Django 5.1.1 on 2024-12-04 17:21

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_log_date_alter_statement_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='statement',
            name='cashe_status',
            field=models.BooleanField(blank=True, default=False, verbose_name='Кеш-статус'),
        ),
        migrations.AlterField(
            model_name='log',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2024, 12, 4, 20, 21, 25, 791094), verbose_name='Дата'),
        ),
        migrations.AlterField(
            model_name='statement',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2024, 12, 4, 20, 21, 25, 790094), verbose_name='Дата'),
        ),
        migrations.AlterField(
            model_name='statement',
            name='mark_activities',
            field=models.IntegerField(blank=True, default=False, verbose_name='Оценка мероприятия'),
        ),
        migrations.AlterField(
            model_name='statement',
            name='mark_culture',
            field=models.IntegerField(blank=True, default=False, verbose_name='Оценка культура'),
        ),
        migrations.AlterField(
            model_name='statement',
            name='mark_science',
            field=models.IntegerField(blank=True, default=False, verbose_name='Оценка наука'),
        ),
        migrations.AlterField(
            model_name='statement',
            name='mark_sport',
            field=models.IntegerField(blank=True, default=False, verbose_name='Оценка спорт'),
        ),
        migrations.AlterField(
            model_name='statement',
            name='mark_studies',
            field=models.IntegerField(blank=True, default=False, verbose_name='Оценка учеба'),
        ),
    ]
