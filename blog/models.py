from django.db import models
from django.contrib.auth.models import AbstractUser
import django.utils.timezone as timezone
from DjangoUeditor.models import UEditorField


# Create your models here.

# 数据库表结构
class ForumUser(AbstractUser):
    '''
    django.contrib.auth.models.User 默认User类字段太少，用AbstractUser
    自定义一个User类，增加字段
    '''
    nickname = models.CharField(max_length=200, null=True, blank=True)
    avatar = models.CharField(max_length=200, null=True, blank=True)
    signature = models.CharField(max_length=500, null=True, blank=True)  # 签名
    location = models.CharField(max_length=200, null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    company = models.CharField(max_length=200, null=True, blank=True)
    role = models.IntegerField(null=True, blank=True)
    balance = models.IntegerField(null=True, blank=True)
    reputation = models.IntegerField(null=True, blank=True)
    self_intro = models.CharField(max_length=500, null=True, blank=True)  # 自我介绍
    updated = models.DateTimeField(null=True, blank=True)


class Topic(models.Model):
    '''
    分类表，
    '''
    title = models.CharField(max_length=200, null=True, blank=True)
    describe = models.CharField(max_length=200, null=True, blank=True)
    lookNumber = models.IntegerField(null=True, blank=True)
    created = models.DateTimeField(null=True, blank=True)
    updated = models.DateTimeField(null=True, blank=True)


class Blog(models.Model):
    creatdate = models.DateTimeField('创建时间', auto_now=True)
    update = models.DateTimeField('更新时间',  default=timezone.now())
    topic = models.ForeignKey('Topic',null = True,on_delete=models.SET_NULL)
    count = models.IntegerField('点击次数', null=True, blank=True)
    Name = models.CharField(max_length=100, blank=True)
    Content = UEditorField(u'内容	', width=600, height=300, toolbars="full", imagePath="upload/images/",
                           filePath="upload/images/",
                           upload_settings={"imageMaxSize": 1204000},
                           settings={}, command=None, blank=True)
