from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from .serializers import CustomerSerializer
from .models import Customer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by('name')
    serializer_class = CustomerSerializer


def index(request):
    return HttpResponse("You are not supposed to be here!")

def dummyresponse(request):
    if request.method == 'POST':
        return JsonResponse({'foo':'bar'})
    if request.method == 'GET':
        return JsonResponse({'foo':'bar'})
