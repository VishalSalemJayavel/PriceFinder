############################################################################################################################################################
#Code Author: Sai Vignesh Kumar Senthilkumar
#IF Something breaks, talk to me before you touch the code
# error codes: 400 - Bad Request, 410 - User already exists, 420 - Usertype error,404 - Not Found
############################################################################################################################################################

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets, generics
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
        
# A View to Edit User Details _________________________________________________________________________________________________________________________

class EditUserView(APIView):
        permissions_classes = (IsAuthenticated,)
        def get(self, request, *args, **kwargs):
            user = request.user
            try:
                print("customer")
                customer_object = Customer.objects.get(user=user)
                print(customer_object.user.name + "customer")
                serializer = CustomerSerializer(customer_object)
                return Response(serializer.data)
            except:
                try:
                    retailer = Retailer.objects.get(user=user)
                    print(retailer.user.name + "retailer")
                    serializer = RetailerSerializer(retailer)
                    return Response(serializer.data)
                except Exception as e:
                    print(e)
                    return JsonResponse({'error': str(e)}, status=420)
        def post(self, request, *args, **Kwargs):
            user = request.user
            print(user.name)                                                                                 # Get the user details from the request object
            try:                                                                                                # Try to get the user details and update them
                customer = Customer.objects.get(user=user)
                print(customer.user.name + "customer")                                                      # Check if the user is a customer
                user_model = customer
            except:
                try:
                    retailer = Retailer.objects.get(user=user)
                    print(retailer.user.name + "retailer")                                                  # Check if the user is a retailer
                    user_model = retailer
                except Exception as e:
                    print(e)
                    return JsonResponse({'error': str(e)}, status=420)
            try:
                # data = json.loads(request.body)
                # print(data)
                # print(request.POST["profilePicture"])
                # print(request.FILES.get("profilePicture"))
                # if data['name']:
                #     name = data['name']
                #     user.name = name
                #     print(name)                                                           
                # if data['address_line_1']:
                #     address_line_1 = data['address_line_1']
                #     user_model.address_line_1 = address_line_1
                #     print(address_line_1)                                                        
                # if data['address_line_2']:
                #     address_line_2 = data['address_line_2']
                #     user_model.address_line_2 = address_line_2
                #     print(address_line_2)                                                         
                # if data['city']:
                #     city = data['city']
                #     user_model.city = city
                #     print(city)                                                         
                # if data['state']:
                #     state = data['state']
                #     user_model.state = state
                #     print(state)                                                         
                # if data['pincode']:
                #     pincode = data['pincode']
                #     user_model.pincode = pincode
                #     print(pincode)  
                # if data['phone_number']:
                #     phone_number = data['phone_number']
                #     user_model.phone_number = phone_number
                #     print(phone_number)                                                       
                # if data['country']:
                #     country = data['country']
                #     user_model.country = country
                #     print(country)                                                         
                # if data['profilePicture']:
                #     profile_picture = data['profilePicture']
                #     user_model.profile_picture = profile_picture                                                                 # Get the data from the request body
                if request.POST['name']:
                    name = request.POST['name'] 
                    print(name)
                    user.name = name
                if request.POST['address_line_1']:
                    address_line_1 = request.POST['address_line_1']
                    print(address_line_1)
                    user_model.address_line_1 = address_line_1
                if request.POST['address_line_2']:     
                    address_line_2 = request.POST['address_line_2']
                    print(address_line_2)                                                    #  |
                    user_model.address_line_2 = address_line_2
                if request.POST['city']:
                    city = request.POST['city']
                    print(city)                                                    #  |
                    user_model.city = city 
                if request.POST['state']:
                    state = request.POST['state']
                    print(state)
                    user_model.state = state
                if request.POST['pincode']:
                    pincode = request.POST['pincode']
                    print(pincode)
                    user_model.pincode = pincode
                # if request.POST['country']:
                #     country = request.POST['country']
                #     print(country)
                #     user_model.country = country
                if  request.FILES.get("profilePicture"):
                    print("profile picture")
                    profile_photo = request.FILES.get("profilePicture")
                    user_model.profile_picture = profile_photo
                user.save()
                print("user saved")
                user_model.save()  
                print("user model saved")      
                return JsonResponse({'Success': 'User Editted Succesfully'}, status = 200)                                              #  |
            except Exception as e:
                print (e)
                return JsonResponse({'error': str(e)}, status=400)                                                                            # Save the user details                                                                                   #  |
                                                                                          # Parse the dat
                
      
                                                                   # Only Authenticated Users can access this view
     

        
# A View to display user details after Login __________________________________________________________________________________________________________

class UserDetailsView(APIView):
    permission_classes = (IsAuthenticated,)                                                                         # Only Authenticated Users can access this view
    def get(self, request, *args, **kwargs):                                                                        # Get the user details from the request object
        try:                                                                                                        # Try to get the user details and return them                               
            user = request.user
            name = user.name
            email = user.email
            try:
                user_object = Customer.objects.get(user=user)                                                                     # Check if the user is a customer
                user_type = 'customer'     
                serializer = CustomerSerializer(user_object)                                                                         # If yes, set user_type to customer
            except:
                print("user not a customer")
                try:
                    user_object = Retailer.objects.get(user=user)                                                                 # Check if the user is a retailer
                    user_type = 'retailer'      
                    serializer = RetailerSerializer(user_object)                                                                    # If yes, set user_type to retailer
                except Exception as e:
                    print("user not a retailer or a customer")
                    print(e)
                    return JsonResponse({'error': str(e)}, status=420) #change added
            phone_number = user_object.phone_number
            address_line_1 = user_object.address_line_1
            address_line_2 = user_object.address_line_2
            city = user_object.city
            state = user_object.state
            pincode = user_object.pincode
           # profile_picture = user_object.profile_picture
            return Response(serializer.data)                                                                                   # Return the user details
                                                                                                         
            # return JsonResponse({'name': name, 
            #                      'email': email, 
            #                      'user_type':user_type, 
            #                      'phone_number': phone_number,  
            #                      'pincode':pincode,
            #                      'address_line_1': address_line_1,
            #                      'address_line_2': address_line_2,
            #                      'city': city,
            #                      'state': state}, status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=400)


class ProductListView(APIView):
    def get(self, request, *args, **kwargs):
        uuid_param = self.kwargs.get('uuid', None)
        category_param = self.kwargs.get('category', None)
        if category_param:
            print(category_param)
            try:
                category = Category.objects.get(name=category_param)
                print(category)
                products = Product.objects.filter(category=category)
                print(products)
                serializer = ProductSerializer(products, many=True)
                return Response(serializer.data)
            except Exception as e:
                print(e)
                return JsonResponse({'error': str(e)}, status=404)
        if uuid_param:
            print(uuid_param)
            try:
                product = Product.objects.get(uuid=uuid_param)
                serializer = ProductSerializer(product)
                return Response(serializer.data)
            except Exception as e:
                print(e)
                return JsonResponse({'error': str(e)}, status=404)
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
# A viw to display all the categories __________________________________________________________________________________________________________________
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# A View to display all the products __________________________________________________________________________________________________________________

class ProductViewSet(viewsets.ReadOnlyModelViewSet):    #Not used for now
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# The below views should probably be commented out later to prevent security issues

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

