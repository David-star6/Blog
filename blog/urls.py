from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from blog.views import user, common, topic
from django.views.generic import TemplateView


urlpatterns = [
    url(r'^$',common.method_splitter,{'GET':topic.get_index}),
    # url(r'^$',topic.topicList.as_view(),name='detail'),
    url(r'^clean',common.method_splitter,{'GET':topic.expire_page}),
    # url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'^get_list/$', common.method_splitter, {'GET': topic.get_List}),
    url(r'^login/$', common.method_splitter, {'GET': user.get_login, 'POST': user.post_login}),
    url(r'^register/$', common.method_splitter, {'GET': user.get_register, 'POST': user.post_register}),
    url(r'^get_topic_title/$', common.method_splitter, {'GET': topic.get_topic_title}),
    url(r'^get_topic_content/$', common.method_splitter, {'GET': topic.get_topi_content}),
]
