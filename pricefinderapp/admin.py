from django.contrib import admin
from .models import *


# Register your models here.

admin.site.register(CustomUser) # Register CustomUser model with admin site
admin.site.register(Customer) # Register Customer model with admin site
admin.site.register(Retailer) # Register Retailer model with admin site