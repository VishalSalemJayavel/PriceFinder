from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.views import APIView
from .serializers import *
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_205_RESET_CONTENT
from rest_framework_simplejwt.tokens import RefreshToken

import json

class TestView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        return Response(data={"message": "Hello, World!"})
    

class logout_view(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status= HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status= HTTP_400_BAD_REQUEST)
        
class CreateUserView(APIView):
    def post(self, request, *args, **kwargs):
        user_exists = False
        try:
            data = json.loads(request.body)
            print(data['name'])
            email = data['email']
            password = data['password']
            user_type = data['user_type']
            name = data['name']
            date_of_birth = data['date_of_birth']
            if user_type == 'customer':
                user_model = Customer
            elif user_type == 'retailer':
                user_model = Retailer
            else:
                return JsonResponse({'error': 'Invalid user type'}, status=400)
            
            try:
                CustomUser.objects.get(email=email)
                user_exists = True
            except:
                print("New User")
            
            if not user_exists: 
            
                cu = CustomUser.objects.create_user(email=email, password=password, name = name)
                user = user_model.objects.create(user = cu, date_of_birth = date_of_birth)
                user.save()
                return JsonResponse({'message': 'User created successfully'}, status=200)
            else:
                return JsonResponse({'error': 'User already exists'}, status=410)
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=400)

class CustomerViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class RetailerViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,) 
    queryset = Retailer.objects.all()
    serializer_class = RetailerSerializer




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