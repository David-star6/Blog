"""
Django settings for mysite project.

Generated by 'django-admin startproject' using Django 2.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'gq23)-er(51_xesbge4y)m=aro_4uw^w=p-$7nf)ew_eyw@&0$'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG =True

# ALLOWED_HOSTS = ['192.168.0.108', 'localhost', '127.0.0.1', ]
ALLOWED_HOSTS = ['*',]

APPEND_SLASH=True #设置项是否开启URL访问地址后面不为/跳转至带有/的路径


# Application definition

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',#只能被注册的用户访问
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
    'PAGINATE_BY': 10
}


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ORIGIN_ALLOW_ALL = True
#
# MIDDLEWARE_CLASSES = (
#     'django.middleware.cache.UpdateCacheMiddleware', # 缓存中间件，必须放在开头
#     'django.middleware.common.CommonMiddleware',
#     'django.contrib.sessions.middleware.SessionMiddleware',
#     #'django.middleware.csrf.CsrfViewMiddleware', # 开启了CSRF,记得在POST表单中加{% csrf_token %},使用RequestContext
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     # Uncomment the next line for simple clickjacking protection:
#     # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
#     'django.middleware.cache.FetchFromCacheMiddleware', # 缓存中间件，必须放在最后
# )


ROOT_URLCONF = 'mysite.urls'


WSGI_APPLICATION = 'mysite.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'blog',
        'USER': 'root',
        'PASSWORD': '995277',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {
            'autocommit': True,
            'init_command': 'SET sql_mode=STRICT_TRANS_TABLES',
        },
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATICFILES_DIRS = (
    # ('alias_hello',os.path.join(BASE_DIR,'blog','statics'))
    os.path.join(BASE_DIR, "my-blog-app/build/static"),
)

# STATIC_DIRS = [STATICFILES_DIRS,]


MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'DIRS': ['my-blog-app/build'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

TEMPLATE_CONTEXT_PROCESSORS = (  # F2E中有current_user对象和request对象,这里设置可在模板中使用RquestContext
    'django.contrib.auth.context_processors.auth',  # user对象等等
    'django.core.context_processors.request',  # request对象等等
    'django.core.context_processors.static',  # 在模板中使用{{ STATIC_URL }}获取静态文件路径
    'blog.context_processors.custom_proc',  # 自定义模板上下文处理器
)

INSTALLED_APPS = (
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
    # 'django.contrib.sites',
    'DjangoUeditor',
    'django.contrib.sitemaps',  # Django sitemap framework
    'blog',
    'rest_framework', #坑了一下午 TemplateDoesNotExist Exception Value:	 rest_framework/api.html
    'rest_framework.authtoken',
)

# 自定义User类
AUTH_USER_MODEL = 'blog.ForumUser'

# 用户认证BackEnds
AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'blog.backends.EmailAuthBackend',
)

# 默认登陆uri
# LOGIN_REDIRECT_URL = '/'
# LOGIN_URL = '/auth/login/'
# LOGOUT_URL = '/auth/logout/'

# 注册用户保留关键字，非Django设置
RESERVED = ["user", "topic", "home", "setting", "forgot", "login", "logout", "register", "admin"]

UEDITOR_SETTINGS = {
    "toolbars": {
        "name1": [['source', '|', 'bold', 'italic', 'underline']],
    },
    "images_upload": {
        "allow_type": "jpg,png",
        "max_size": "2222kb"
    },
    "files_upload": {
        "allow_type": "zip,rar",
        "max_size": "2222kb"
    },
    "image_manager": {
        "location": ""
    },
}
