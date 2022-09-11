from captcha.fields import CaptchaField
from django import forms
from .models import *


class RepairRequest(forms.ModelForm):
    captcha = CaptchaField(generator='captcha.helpers.math_challenge', label = 'посчитайте',
                           error_messages={'invalid': 'Не верное значение'})

    class Meta:
        model = Repair_Request
        fields = '__all__'


class RepairRequestPhoto(forms.ModelForm):
    captcha = CaptchaField(generator='captcha.helpers.math_challenge', label='посчитайте',
                           error_messages={'invalid': 'Не верное значение'})

    class Meta:
        model = Repair_Request_Photo
        fields = '__all__'


class ReviewsAll(forms.ModelForm):
    captcha = CaptchaField(generator='captcha.helpers.math_challenge', help_text='надо посчитать',
                           error_messages={'invalid': 'Не верное значение'})

    class Meta:
        model = Reviews
        fields = '__all__'

