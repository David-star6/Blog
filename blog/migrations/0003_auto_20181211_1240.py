# Generated by Django 2.0.3 on 2018-12-11 12:40

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20181115_0341'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='fid',
        ),
        migrations.AddField(
            model_name='file',
            name='file_name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='blog',
            name='update',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 11, 12, 40, 38, 615342, tzinfo=utc), verbose_name='更新时间'),
        ),
    ]
