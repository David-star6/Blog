from django.contrib import admin

# Register your models here.

from blog import models

admin.site.register(models.ForumUser)
admin.site.register(models.Topic)
admin.site.register(models.Blog)
admin.site.register(models.File)
admin.site.register(models.UserCenterTitle)


