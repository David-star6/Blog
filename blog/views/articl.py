
import re

from blog.models import  Blog

from blog.views import returnJson

from django.forms.models import model_to_dict

import json

from django.core import serializers


def get_list(requset):
    dr = re.compile(r'<[^>]+>', re.S)
    articl = Blog.objects.all().order_by('id').values()
    list = []
    for item in articl:
        items = item
        items['reContent'] = dr.sub('', item.get('content'))
        list.append(items)
    return returnJson.json_responre(list)


def get_detail(request):
    fid = json.loads(request.body).get('id')
    try:
        list = Blog.objects.get(id=fid)
        data = model_to_dict(list)
        return returnJson.json_responre(data)
    except:
        return  returnJson.json_error()

