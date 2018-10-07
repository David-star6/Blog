from django.db import models
from django.contrib.auth.models import AbstractUser
import django.utils.timezone as timezone
from DjangoUeditor.models import UEditorField

from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

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

class MediaFile(models.Model):
    '''
    圖片表
    '''
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='upload/')
    def __str__(self):
        return self.name

class VideoFile(models.Model):
    '''
    文件
    '''
    fid =  models.IntegerField(null=True, blank=True)
    video = models.FileField(upload_to='upload/')
    def __str__(self):
        return  self.name

class Blog(models.Model):
    '''
    编辑的文章
    '''
    creatdate = models.DateTimeField('创建时间', auto_now=True)
    update = models.DateTimeField('更新时间',  default=timezone.now())
    topic = models.ForeignKey('Topic',null = True,on_delete=models.SET_NULL)
    count = models.IntegerField('点击次数', null=True, blank=True)
    name = models.CharField(max_length=100, blank=True)
    content = UEditorField(u'内容	', width=600, height=300, toolbars="full", imagePath="upload/images/",
                           filePath="upload/images/",
                           upload_settings={"imageMaxSize": 1204000},
                           settings={}, command=None, blank=True)

class UserCenterTitle(models.Model):
    '''
    用户中心的标题
    '''
    name = models.CharField('标题名称',max_length=10,null=True,blank=True)
    weight = models.IntegerField('1-100',default=1,validators=[MaxValueValidator(100),MinValueValidator(1)])
    icon = models.CharField('标题的icon',max_length=50,null=True,blank=True)
    isSuper = models.BooleanField('是否是超级用户所有',default=False)

