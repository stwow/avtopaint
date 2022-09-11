from django.core.exceptions import ValidationError
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect
from .forms import *
from .models import *
import json


def index(request):
    if request.POST:
        form = RepairRequest(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse(json.dumps({"haveErrors": True}))
        else:
            return HttpResponse(json.dumps({"haveErrors": False}))
    form = RepairRequest()
    service = Services.objects.all()
    reviews = Reviews.objects.all()
    photo = Photo.objects.all()
    context = {'service': service, 'form': form, 'reviews': reviews, 'photo': photo}
    return render(request, 'main/index.html', context)


def index1(request):
    if request.POST:
        form = RepairRequestPhoto(request.POST, request.FILES)  #добавить возможность добавления нескольких файлов
        if form.is_valid():
            form.save()
            return HttpResponse(json.dumps({"haveErrors": True}))
        else:
            return HttpResponse(json.dumps({"haveErrors": False}))
            #raise ValidationError(form.errors)
    return redirect('index')


def indexes(request):
    if request.POST:
        form = ReviewsAll(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse(json.dumps({"haveErrors": True}))
        else:
            return HttpResponse(json.dumps({"haveErrors": False}))
            #return HttpResponse(ValidationError(form.errors))
    return redirect('index')