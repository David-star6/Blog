from django import forms

class FileForm(forms.Form):
    name = forms.CharField(required=True,
                             error_messages={'required': "邮箱不能为空"})
    image = forms.ImageField(required=True,
                             error_messages={'required': "图片不能为空"})