from django.db import models
from django.conf import settings

class Customer(models.Model): # Customer model for storing customer details
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) # One to one relationship with User model
    phone = models.CharField(max_length=200)    # Phone number of customer
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True) # Profile picture of customer
    addressline1 = models.CharField(max_length=200) # Address line 1 of customer
    addressline2  = models.CharField(max_length=200) # Address line 2 of customer
    city = models.CharField(max_length=200) # City of customer
    state = models.CharField(max_length=200)    # State of customer
    country = models.CharField(max_length=200) # Country of customer
    zipcode = models.CharField(max_length=200) # Zipcode of customer
    shippingline1 = models.CharField(max_length=200)    # Shipping address line 1 of customer
    shippingline2 = models.CharField(max_length=200)   # Shipping address line 2 of customer
    shippingcity = models.CharField(max_length=200) # Shipping city of customer
    shippingstate = models.CharField(max_length=200)   # Shipping state of customer
    shippingcountry = models.CharField(max_length=200)   # Shipping country of customer
    shippingzipcode = models.CharField(max_length=200)  # Shipping zipcode of customer


    def __str__(self):
        return self.name


# Create your models here.
