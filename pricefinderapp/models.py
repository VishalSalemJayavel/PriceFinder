#############################################################################################################################################
# Code Author: Sai Vignesh Kumar Senthilkumar
# IF Something breaks, talk to me before you touch the code
# better yet, don't touch the code at all
# This is the file that creates the database tables dont mess around.
#############################################################################################################################################
from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    Group,
    Permission,
)
from django.utils import timezone
from django.urls import reverse

import uuid


# create your models here
# Custom User Manager to create a user with email and password instead of username and password as in the default django user model ______________________________________________
class CustomUserManager(BaseUserManager):
    def create_user(
        self, email, password, **extra_fields
    ):  # Function to Create a user with email and password
        if not email:
            raise ValueError("Email is required")
        if not password:
            raise ValueError("Password is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)

        return user

    def create_superuser(
        self, email, password, **extra_fields
    ):  # Function to Create a superuser with email and password
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")

        return self.create_user(email, password, **extra_fields)


# Custom User Model to create a user with email and password instead of username and password as in the default django user model ______________________________________________
# This is the actual user table that is created in the database
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    groups = models.ManyToManyField(Group, related_name="custom", blank=True)
    user_permissions = models.ManyToManyField(
        Permission, related_name="custom_user_permissions", blank=True, default=""
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email


# Customer Model to store Additional Customer Details _______________________________________________________________________________________________________________________
# This is the actual customer table that is created in the database
class Customer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=10, null=True)
    profile_picture = models.ImageField(upload_to="profile_pictures", null=True)

    def __str__(self):
        return self.user.name


# Retailer Model to store Additional Retailer Details _______________________________________________________________________________________________________________________
# This is the actual retailer table that is created in the database
class Retailer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=10, null=True)
    profile_picture = models.ImageField(upload_to="profile_pictures", null=True)

    def __str__(self):
        return self.user.name
    
# Category Model to store Product Categories _______________________________________________________________________________________________________________________

class Category(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="category_images", null=True)

    def __str__(self):
        return self.name
    

# Product Model to store Product Details _______________________________________________________________________________________________________________________

class Product(models.Model):
    title = models.CharField(max_length=255)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    Rupee = '₹'
    Dollar = '$'
    Euro = '€'
    currency_choices = [
        (Rupee, '₹'),
        (Dollar, '$'),
        (Euro, '€'),
    ]
    currency = models.CharField(max_length=1, choices=currency_choices, default=Rupee)
    retailer = models.ForeignKey(Retailer, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="product_images", null=True)
    stocks = models.IntegerField(default=0)
    litre = 'L'
    kilogram = 'kg'
    gram = 'g'
    single = ''
    unit_choices = [
        (litre, 'L'),
        (kilogram, 'kg'),
        (gram, 'g'),
        (single, 'QTY'),
    ]
    unit = models.CharField(max_length=3, choices=unit_choices, default=single)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("product_detail", args=[str(self.uuid)])