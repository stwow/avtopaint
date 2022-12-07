from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import *
from .models import *
import json


def main(request):
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


def set_repair_request_photo(request):
    if request.POST:
        form = RepairRequestPhoto(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponse(json.dumps({"haveErrors": True}))
        else:
            return HttpResponse(json.dumps({"haveErrors": False}))
            #raise ValidationError(form.errors)
    return redirect('index')


def set_review(request):
    if request.POST:
        form = ReviewsAll(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse(json.dumps({"haveErrors": True}))
        else:
            return HttpResponse(json.dumps({"haveErrors": False}))
            #return HttpResponse(ValidationError(form.errors))
    return redirect('index')