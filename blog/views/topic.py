import json, math, hashlib
from django.http import HttpResponse, Http404
from django.shortcuts import render_to_response, redirect, get_object_or_404
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
from django.utils import timezone
from django.conf import settings
from blog.models import ForumUser
from django.http import JsonResponse
from blog.models import ForumUser, Topic, Blog
from django.core import serializers
from django.forms.models import model_to_dict
from blog.views import returnJson


from django.core.cache import cache
from django.http import HttpRequest
from django.utils.cache import get_cache_key

import traceback
import sys

import re


from django.views.generic import ListView

from blog.forms.user import TopicForm

from django.core.paginator import Paginator

from django import forms

from blog.forms.TestUeditorModelForm import TestUEditorForm


# from DjangoUeditor.forms import UEditorField class TestUEditorForm(forms.Form):
#     Description=UEditorField("描述",initial="abc",width=600,height=800)


def get_index(requset):
    user = requset.user
    # if user.is_authenticated():
    # 	counter = {
    # 	'topics':user.topic_author.all().count(),
    # 	'replies':user.rely_author.all().count(),
    # 	'favorites':user.fav_user.all().count()
    # 	}
    # status_counter={
    #    'users':ForumUser.objects.all().count(),
    # }
    # return render_to_response('topic/topicHome.html',locals())
    topic_list = Topic.objects.all().order_by('id').values()
    form = TestUEditorForm()
    return render_to_response('topic/topicHome.html', {'topic_list': topic_list, "form": form})


def get_List(request):
    if request.method == 'GET':
        try:
            data = Blog.objects.all().values()
            return returnJson.json_responre(data)
        except:
            # return JsonResponse({'a':'b'})
            traceback.print_exc()
            # sys.exc_info()

def get_user_list(requset):
    if requset.method == 'GET':
        data = ForumUser.objects.all()
        data = serializers.serialize("json", data)
        return returnJson.json_responre(json.loads(data), safe=False)


class ClassEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Topic):
            return o.title
        elif isinstance(o, Topic):
            return o.description
        return json.JSONEncoder.default(self, o)


def get_topic_title(request):
    fid = request.GET.get('id')
    try:
        data = Topic.objects.get(id=fid)
        u = json.dumps(model_to_dict(data), cls=returnJson.DataTimeEncoder)
        return returnJson.json_responre(json.loads(u), safe=False)
    except Topic.DoesNotExist:
        return returnJson.json_error('no exist', safe=False)


def get_topi_content(request):
    obejct = ['json', 'pual', 'george', 'rirga']
    p = Paginator(obejct, 2)
    p = p.page(1).object_list;
    return returnJson.json_responre(p, safe=False)

def expire_page(path):
    request = HttpRequest()
    request.path = path
    key = get_cache_key(request)
    if cache.has_key(key):
        cache.delete(key)


def get_topic(request):
    topicList = Topic.objects.all().order_by('id')
    objs = []
    dr = re.compile(r'<[^>]+>',re.S)
    for item in topicList:
            obj = {}
            mode = item.blog_set.order_by('id').values()
            obj['title'] = model_to_dict(item)['title']
            arr = []
            for model in mode:
                model['content'] = dr.sub('', model.get('content'))
                arr.append(model)
            # model = mode[0]
            # model['Content'] = dr.sub('', model.get('Content'))
            # obj['data'] = model
            obj['data'] = arr
            objs.append(obj)
    return returnJson.json_responre(objs)


def get_topic_content(request):
    print(request.POST.get('id'))
    fid = request.POST.get('id')
    model = Blog.objects.get(id=fid)
    u = json.dumps(model_to_dict(model), cls=returnJson.DataTimeEncoder)
    return returnJson.json_responre(json.loads(u), safe=False)

class topicList(ListView):
    template_name = 'topic/topicHome.html'
    context_object_name = 'topic_list'
    # model = Topic
    paginate_by = 2  # 一个页面显示的条目

    def get_queryset(self):
        topic_list = Topic.objects.all().order_by('id')
        objs = []
        for item in topic_list:
            try:
                obj = {}
                mode = item.blog_set.order_by('id').values()
                obj['title'] = model_to_dict(item)['title']
                obj['data'] = list(mode)
                objs.append(obj)
            except:
                print('null')
        return objs

    def get_context_data(self, *, object_list=None, **kwargs):
        kwargs['category_list'] = Topic.objects.all().order_by('id').values()
        return super(topicList, self).get_context_data(**kwargs)
