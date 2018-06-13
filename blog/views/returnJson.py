from django.http import HttpResponse, HttpRequest
from dss.Serializer import serializer

import json

import datetime


def response_as_json(data, foreign_penetrate=False):
    jsonString = serializer(data=data, output_type="json", foreign=foreign_penetrate)
    response = HttpResponse(
            # json.dumps(dataa, cls=MyEncoder),
            jsonString,
            content_type="application/json",
    )
    response["Access-Control-Allow-Origin"] = "*"
    return response


def json_responre(data,code=200,foreign_penetrate=False,**kwargs):
    data={
        'code':code,
        'msg':'成功',
        'data':data,
    }
    return response_as_json(data, foreign_penetrate=foreign_penetrate)

def json_error(error_string='',code=500,**kw):
    data = {
        'code':code,
        'msg':error_string,
        'data':{}
    }
    data.update(kw)
    return  response_as_json(data, foreign_penetrate=False)

class DataTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o,datetime.datetime):
            return o.strftime('%Y-%m-%d%H:%M:%S')
        elif isinstance(o,datetime):
            return o.strftime('%Y-%m-%d')
        return json.JSONEncoder.default(o)