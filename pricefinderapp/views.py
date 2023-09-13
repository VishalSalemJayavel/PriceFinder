from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.views import APIView
from .serializers import CustomerSerializer
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

import json



class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by('name')
    serializer_class = CustomerSerializer

class RetailerViewSet(viewsets.ModelViewSet):
    queryset = Retailer.objects.all().order_by('name')
    serializer_class = CustomerSerializer




def index(request):
    return HttpResponse("You are not supposed to be here!")

#

# class LoginView(APIView):
#     def login_view(request):
#         if request.method == 'POST':
#             data = json.loads(request.body)
#             email = data['email']
#             password = data['password']
#             user_type = data['user_type']

#             if user_type == 'customer':
#                 user_model = Customer
#             elif user_type == 'retailer':
#                 user_model = Retailer
#             else:
#                 return JsonResponse({'error': 'Invalid user type'}, status=400)
        
#             user = authenticate(request, username=email, password=password)

#             if user is not None:
#                 login(request, user)
#                 return JsonResponse({'message': 'Login successful'}, status=200)
#             else:
#                 return JsonResponse({'error': 'Invalid credentials'}, status=401)
#         else:
#             return JsonResponse({'error': 'Invalid method'}, status=405)

# class LogoutView(APIView):    
#     def logout_view(request):
#         logout(request)
#         return JsonResponse({'message': 'Logout successful'}, status=200)