############################################################################################################################################################
#Code Author: Sai Vignesh Kumar Senthilkumar
#IF Something breaks, talk to me before you touch the code
############################################################################################################################################################

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
# A Test View to check if the API is working __________________________________________________________________________________________________________

class TestView(APIView):        
    permission_classes = (IsAuthenticated,)        

    def get(self, request, *args, **kwargs):
        return Response(data={"message": "Hello, World!"})
    
# LOGOUT VIEW - Logs Out User when provided with a refresh token_______________________________________________________________________________________

class logout_view(APIView):                                                                         # Logout View Class
    permission_classes = (IsAuthenticated,)                                                         # Only Authenticated Users can access this view

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh_token"]                                           #  Get the refresh token from the request body 
            token = RefreshToken(refresh_token)                                                     #  Create a RefreshToken object with the refresh token
            token.blacklist()                                                                       #  Blacklist the token
            return Response(status= HTTP_205_RESET_CONTENT)                                         #  Return a success message      
        except Exception as e:                                                                      #  Catch any exception and return an error message              
            print(e)
            return Response(status= HTTP_400_BAD_REQUEST)                                           #  Return an error message         
        

# A View to Create a new User. User Can be of type Customer or Retailer  ______________________________________________________________________________      
class CreateUserView(APIView):
    def post(self, request, *args, **kwargs):
        user_exists = False                                                                               # Flag to check if user already exists
        try:
            data = json.loads(request.body)                                                               # Get the data from the request body
            email = data['email']                                                                         # Parse the data
            password = data['password']                                                                   #  |
            user_type = data['user_type']                                                                 #  |            
            name = data['name']                                                                           #  V                          
            phone_number = data['phone_number']                                                           #  Till here            
            if user_type == 'customer':                                                                   #  Check the user type and assign the user model accordingly                          
                user_model = Customer                                                                     #   |              
            elif user_type == 'retailer':                                                                 #   |          
                user_model = Retailer                                                                     #   |                               
            else:                                                                                         #   V
                return JsonResponse({'error': 'Invalid user type'}, status=400)                           #  Till here
            
            try:                                                                                          # Check if user already exists                         
                CustomUser.objects.get(email=email)                                                       # Checks by trying to get CustomUser object with the given email                           
                user_exists = True                                                                        # Updates FLAG     
            except:
                print("New User")                                                                         # If user does not exist, create a new user. Prints on Console to let me know 
            
            if not user_exists:                                                                           # If user does not exist, create a new user      
            
                customuser = CustomUser.objects.create_user(email=email, password=password, name = name)  # First creates a new CustomUser object
                user = user_model.objects.create(user = customuser, phone_number=phone_number)            # Then creates a new user object of the type specified by the user(Customer/Retailer) and link them using FK user field
                user.save()                                                                               # Save the user object                         
                return JsonResponse({'message': 'User created successfully'}, status=200)                 # Return a success message
            else:
                return JsonResponse({'error': 'User already exists'}, status=410)                         # Return an error message if user already exists
        except Exception as e:                                                                            # Catch any exception and return an error message                       
            print(e)
            return JsonResponse({'error': str(e)}, status=400)
        
# A View to display user details after Login __________________________________________________________________________________________________________

class UserDetailsView(APIView):
    permission_classes = (IsAuthenticated,)                                                                         # Only Authenticated Users can access this view
    def get(self, request, *args, **kwargs):                                                                        # Get the user details from the request object
        try:                                                                                                        # Try to get the user details and return them                               
            user = request.user
            name = user.name
            email = user.email
            return JsonResponse({'name': name, 'email': email}, status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=400)
            


# Customer View Returs a list of all the customers __________________________________________________________________________________________________

class CustomerViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

# Retailer View Returs a list of all the retailers __________________________________________________________________________________________________

class RetailerViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,) 
    queryset = Retailer.objects.all()
    serializer_class = RetailerSerializer


#index view to redirect to the API documentation page (does not actually redirect just yet)______________________________________________________________________
def index(request):
    return HttpResponse("You are not supposed to be here!")

