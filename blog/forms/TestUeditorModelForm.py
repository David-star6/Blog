
from django import forms
from blog.models import Blog

#
# class TestUeditorModelForm(forms.ModelForm):
#     class Meta:
#         model = Blog
#         fields = '__all__'

from  DjangoUeditor.forms import UEditorField

class TestUEditorForm(forms.Form):
    Description=UEditorField("描述",initial="abc",width=600,height=800)