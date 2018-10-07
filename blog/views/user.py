import os, uuid, copy, urllib, hashlib
from PIL import Image
from django.shortcuts import render_to_response, redirect,render
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.template import RequestContext, Context, loader
from django.utils import timezone
from django.conf import settings
from blog.forms.user import  LoginForm,RegisterForm
from blog.views import returnJson
from django.views.decorators.csrf import csrf_exempt
from  blog.models import ForumUser
from blog.models import UserCenterTitle


from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response


from rest_framework.authtoken import views


from django.http import HttpResponse






from django.dispatch import receiver

from django.db.models.signals import post_save


def get_login(request, **kwargs):
	auth.logout(request)
	return render(request,'user/login.html',kwargs)
	# return render_to_response('user/login.html', kwargs,
        # RequestContext(request))

def post_login(request):
	form = LoginForm(request.POST);
	if not form.is_valid():
		return get_login(request,errors = form.errors)
	user=form.get_user()
	auth.login(request,user)
	if user.is_staff:
		return redirect(request.POST.get('next','/manage/admin'))
	return redirect(request.POST.get('next', '/'))

@csrf_exempt
def user_login(request):
	form = LoginForm(request.POST);
	if not  form.is_valid():
		return  returnJson.json_error('请输入账号密码或者正确的邮件')
	user=form.get_user()
	auth.login(request,user)
	token_str = Token.objects.get(user=user).key
	data = {'token':token_str}
	if user.is_active:
		return returnJson.json_responre(data)
	return returnJson.json_error('登录失败')

# @api_view(['GET'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def get_charm(request):
	print(request.user)
	print(request.GET)
	return HttpResponse("Welcome.")

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_userCentertitle(request):
	title = UserCenterTitle.objects.all().values()
	return returnJson.json_responre(title)


def get_register(request, **kwargs):
	auth.logout(request.header)
	return render_to_response('user/register.html', kwargs,
        RequestContext(request))


def post_register(request):
	form = RegisterForm(request.POST)
	if not form.is_valid():
		return get_register(request, errors=form.errors)
	return redirect(settings.LOGIN_URL)

def post_api_login(request):
	form = RegisterForm(request.POST)
	if not form.is_valid():
		return  returnJson.json_error(form.errors)
	form.save();
	return  returnJson.json_responre('success')

class UserList(APIView):
	# authentication_classes = (
	# 	BasicAuthentication,
	# 	# SessionAuthentication,
	# 	# TokenAuthentication,
	# )
	permission_classes = (
		IsAuthenticated,
	)

	def post(self,request):
		return returnJson.json_responre('success')


#
# 六，用户获取自己的token。
#
# token_str = Token.objects.get(user=request.user).key
#
# 七，用户更新自己的token。
#
# token_key = hashlib.sha1(os.urandom(24)).hexdigest()
#
# Token.objects.filter(user_id=request.user.id).update(key=token_key)

