from django import forms

class FileForm(forms.Form):
    file = forms.FileField(required=True,
                             error_messages={'required': "图片不能为空"})