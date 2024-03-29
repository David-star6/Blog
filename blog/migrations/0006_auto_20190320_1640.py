# Generated by Django 2.0.3 on 2019-03-20 08:40

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_auto_20190320_1626'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='blog',
            options={'verbose_name_plural': '编辑的文章'},
        ),
        migrations.AlterModelOptions(
            name='file',
            options={'verbose_name_plural': '文件'},
        ),
        migrations.AlterModelOptions(
            name='usercenter',
            options={'verbose_name_plural': '用户中心'},
        ),
        migrations.AlterField(
            model_name='blog',
            name='classify',
            field=models.CharField(choices=[('iOS', 'iOS'), ('javascript', 'Javascript'), ('other', 'Other')], max_length=15, null=True, verbose_name='类型'),
        ),
        migrations.AlterField(
            model_name='blog',
            name='update',
            field=models.DateTimeField(default=datetime.datetime(2019, 3, 20, 8, 40, 3, 347095, tzinfo=utc), verbose_name='更新时间'),
        ),
    ]
