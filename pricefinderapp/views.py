from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("You are not supposed to be here!")
