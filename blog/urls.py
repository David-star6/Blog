from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from blog.views import user, common, topic,util
from django.views.generic import TemplateView

from rest_framework.authtoken import views


urlpatterns = [
    # url(r'^$',common.method_splitter,{'GET':topic.get_index}),
    # url(r'^$',topic.topicList.as_view(),name='detail'),
    # url(r'^clean',common.method_splitter,{'GET':topic.expire_page}),

    url(r'^api-token-auth/', views.obtain_auth_token),  # 获取token
    # api
    url(r'^api/getUserCenterTitle/$',common.method_splitter,{'GET':user.get_userCentertitle}),
    url(r'^api/getFile/$',common.method_splitter,{'GET':util.getFile}),
    url(r'^api/uploadFile/$',common.method_splitter,{'GET':util.uploadFile,'POST':util.uploadFile}),
    url(r'^api/upload_image/$',common.method_splitter,{'GET':util.uploadImage,'POST':util.uploadImage}),
    url(r'^api/upload_video/$',common.method_splitter,{'GET':util.uploadVideo,'POST':util.uploadVideo}),
    url(r'^api/showAllImage/$',common.method_splitter,{'GET':util.showUploadImage}),
    url(r'^api/login/$',common.method_splitter,{'POST':user.user_login}),
    url(r'^api/dele_file/$',common.method_splitter,{"POST":util.deleFile}),
    url(r'^api/register/$', common.method_splitter, {"POST": user.post_api_login}),
    url(r'^api/get_topic_list$', common.method_splitter, {"GET": topic.get_topic}),
    url(r'^api/get_topic_content/$', common.method_splitter, {"POST": topic.get_topic_content}),

    # url(r'^api/test/$',common.method_splitter,{'GET':user.get_charm}),
    url(r'^api/test/', user.UserList.as_view()),


    url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'^get_list/$', common.method_splitter, {'GET': topic.get_List}),
    url(r'^login/$', common.method_splitter, {'GET': user.get_login, 'POST': user.post_login}),
    url(r'^register/$', common.method_splitter, {'GET': user.get_register, 'POST': user.post_register}),
    url(r'^get_topic_title/$', common.method_splitter, {'GET': topic.get_topic_title}),
    url(r'^get_topic_content/$', common.method_splitter, {'GET': topic.get_topi_content}),
]
