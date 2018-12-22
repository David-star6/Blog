from mysite.settings import BASE_DIR

from django.shortcuts import render_to_response, redirect,render,HttpResponse

from django.shortcuts import render_to_response, redirect,render,HttpResponse

from blog.forms.file import FileForm

from blog.models import File

from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated

from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from rest_framework.decorators import api_view,permission_classes,authentication_classes

import json, math, hashlib,os

from blog.views import returnJson

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def uploadFile(request,**kwargs):
    print(request)
    print(request.META)
    if request.method == 'POST':
        fileform = FileForm(request.POST,request.FILES)
        if fileform.is_valid():
            dic = fileform.cleaned_data
            newfile = File(fid = request.user.id,video = dic.get('file'))
            newfile.save()
            return returnJson.json_responre('success')
        else:
            return returnJson.json_error(fileform.errors)

@api_view(['GET'])
# @authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def getFile(request,**kwargs):
    if request.method == 'GET':
        data = File.objects.all().values()
        for index, item in enumerate(data):
            item['video'] =  'media/' + item.get('video')
        return  returnJson.json_responre(data)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def deleFile(requst,**kwargs):
    name = requst.POST.get('name')
    url = name[6:len(name)]
    print(url)
    patch = os.path.join(BASE_DIR, name)
    print(patch)
    if os.path.exists(patch):
        os.remove(patch)
        print(patch)
        try:
            File.objects.get(video=url).delete()
            return returnJson.json_responre('删除成功')
        except:
            return returnJson.json_error("删除失败")
    else:
        return returnJson.json_error("删除失败,图片不存在")

def uploadImage(request, **kwargs):
    if request.method == 'GET':
        return render(request, 'user/upload.html', kwargs)
    if request.method == 'POST':
        form = FileForm(request.POST,request.FILES)
        print(request.FILES)
        if form.is_valid():
            dic = form.cleaned_data
            new = File(file = dic.get('file'))
            new.save()
            return HttpResponse('存储成功')
        else:
            return HttpResponse('shibai')