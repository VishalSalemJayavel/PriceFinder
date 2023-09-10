from django.db import models
from django.conf import settings

#create your models here

class Customer(models.Model): # Customer model for storing customer details
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) # One to one relationship with User model
    name = models.CharField(max_length=200, null=True) # Name of customer
    phone = models.CharField(max_length=200)    # Phone number of customer
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True) # Profile picture of customer
    addressline1 = models.CharField(max_length=200, blank=True, null=True) # Address line 1 of customer
    addressline2  = models.CharField(max_length=200, blank=True, null = True) # Address line 2 of customer
    city = models.CharField(max_length=200, blank=True, null = True) # City of customer
    state = models.CharField(max_length=200, blank=True, null = True)    # State of customer
    country = models.CharField(max_length=200, blank=True, null = True) # Country of customer
    zipcode = models.CharField(max_length=200, blank=True, null = True) # Zipcode of customer
    shippingline1 = models.CharField(max_length=200, blank=True, null = True)    # Shipping address line 1 of customer
    shippingline2 = models.CharField(max_length=200, blank=True, null = True)   # Shipping address line 2 of customer
    shippingcity = models.CharField(max_length=200, blank=True, null = True) # Shipping city of customer
    shippingstate = models.CharField(max_length=200, blank = True, null = True)   # Shipping state of customer
    shippingcountry = models.CharField(max_length=200, blank=True, null = True)   # Shipping country of customer
    shippingzipcode = models.CharField(max_length=200, blank=True, null = True)  # Shipping zipcode of customer


    def __str__(self):
        return self.name




