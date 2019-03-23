"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.conf import settings

from django.contrib.auth.decorators import login_required
from django.contrib import admin

# admin.autodiscover()
# admin.site.login = login_required(admin.site.login)  # 设置admin登录的页面，settings.LOGIN_URL

from django.urls import path
import blog.urls
from django.views import static

from DjangoUeditor import urls as DjangoUeditor_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include(blog.urls)),
    url(r'^manage/admin', admin.site.urls),
    url(r'^ueditor/', include(DjangoUeditor_urls)),
    # 增加以下一行，以识别静态资源
    url(r'^static/(?P<path>.*)$', static.serve, {'document_root': settings.STATIC_ROOT}, name='static')

]

# use Django server /media/ files
from django.conf import settings

if settings.DEBUG:
    from django.conf.urls.static import static

    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
