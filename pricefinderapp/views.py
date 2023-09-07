from django.shortcuts import render
from django.http import HttpResponse, JsonResponse


def index(request):
    return HttpResponse("You are not supposed to be here!")

def dummyresponse(request):
    if request.method == 'POST':
        return JsonResponse({'foo':'bar'})
    if request.method == 'GET':
        return JsonResponse({'foo':'bar'})
