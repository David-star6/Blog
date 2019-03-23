from django.contrib import admin

# Register your models here.

from blog import models

admin.site.site_header = '博客后台管理系统'
admin.site.site_title = '博客后台'

class BlogAdmin(admin.ModelAdmin):
    list_display=('id','classify','name','update',)
    list_per_page = 50
    # list_display_links = ('classify', 'content')
    def get_readonly_fields(self,request,obj=None):
        readonly_fields = ['count']
        return readonly_fields


admin.site.register(models.ForumUser)
admin.site.register(models.Blog,BlogAdmin)
admin.site.register(models.File)
admin.site.register(models.UserCenter)


