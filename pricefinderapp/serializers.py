from rest_framework import serializers

from .models import *

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        read_only_fields = '__all__' # All fields of Customer model are serialized

class RetailerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retailer
        read_only_fields = '__all__' # All fields of Retailer model are serialized

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')
    retailer = serializers.ReadOnlyField(source='retailer.user.name')
    class Meta:
        model = Product
        fields = ('__all__') # All fields of Product model are serialized

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__' # All fields of Category model are serialized