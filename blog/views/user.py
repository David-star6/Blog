import os, uuid, copy, urllib
from PIL import Image
from django.shortcuts import render_to_response, redirect,render
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.template import RequestContext, Context, loader
from django.utils import timezone
from django.conf import settings
from blog.forms.user import  LoginForm,RegisterForm



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

def get_register(request, **kwargs):
	auth.logout(request)
	return render_to_response('user/register.html', kwargs,
        RequestContext(request))

def post_register(request):
	form = RegisterForm(request.POST)
	if not form.is_valid():
		return get_register(request, errors=form.errors)
	user=form.save()
	return redirect(settings.LOGIN_URL)