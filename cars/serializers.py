from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'brand', 'model', 'year', 'price', 'fuel_type', 'kms_driven', 'customer_name', 'is_sold']