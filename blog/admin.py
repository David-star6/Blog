from django.contrib import admin

# Register your models here.

from blog import models

admin.site.site_header = '博客后台管理系统'
admin.site.site_title = '博客后台'

admin.site.register(models.ForumUser)
admin.site.register(models.Topic)
admin.site.register(models.Blog)
admin.site.register(models.File)
admin.site.register(models.UserCenter)


