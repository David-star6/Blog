
import json, math, hashlib,os

from mysite.settings import BASE_DIR

from django.shortcuts import render_to_response, redirect,render,HttpResponse

from blog.models import MediaFile,VideoFile

from blog.forms.user import MediaFileForm,VideoFileForm,fileForm

from blog.views import returnJson

from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view,permission_classes,authentication_classes


def uploadImage(request, **kwargs):
    if request.method == 'GET':
        return render(request, 'user/upload.html', kwargs)
    if request.method == 'POST':
        # new_img = MediaFile(name = request.POST.get('name'),image = request.FILES.get('image'))
#         # new_img.save()
#         # return HttpResponse('上传成功')
        form = MediaFileForm(request.POST,request.FILES)
        if form.is_valid():
            dic = form.cleaned_data
            new = MediaFile(name = dic.get('name'),image = dic.get('image'))
            new.save()
            return HttpResponse('存储成功')
        else:
            return HttpResponse('shibai')
    # if request.method == 'POST':
    #     obj = request.FILES.get('img')
    #     file = open('media/'+obj.name,'wb')
    #     for line in obj.chunks():
    #         file.write(line)
    #     file.close()
    #     return  HttpResponse('上传成功')

def uploadVideo(request, **kwargs):
    print(request.POST)
    if request.method =='GET':
        return  render(request,'user/upload.html',kwargs)
    if request.method =='POST':
        videoForm = VideoFileForm(request.POST,request.FILES)
        if videoForm.is_valid():
            dic = videoForm.cleaned_data
            print(dic)
            # new = VideoFile(name = dic.get('name'),video = dic.get('video'))
            # new.save()
            return HttpResponse('储存成功')
        else:
            return returnJson.response_as_json(videoForm.errors)

def showUploadImage(request,**kwargs):
    if request.method == 'GET':
        data = MediaFile.objects.all().values()
        return returnJson.json_responre(data)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def uploadFile(request,**kwargs):
    print(request)
    print(request.META)
    if request.method == 'POST':
        fileform = fileForm(request.POST,request.FILES)
        if fileform.is_valid():
            dic = fileform.cleaned_data
            newfile = VideoFile(fid = request.user.id,video = dic.get('file'))
            newfile.save()
            return returnJson.json_responre('success')
        else:
            return returnJson.json_error(fileform.errors)

@api_view(['GET'])
# @authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def getFile(request,**kwargs):
    if request.method == 'GET':
        data = VideoFile.objects.all().values()
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
            VideoFile.objects.get(video=url).delete()
            return returnJson.json_responre('删除成功')
        except:
            return returnJson.json_error("删除失败")
    else:
        return returnJson.json_error("删除失败,图片不存在")






