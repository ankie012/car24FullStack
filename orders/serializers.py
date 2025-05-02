from rest_framework import serializers
from .models import Order, User
from cars.serializers import CarSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'user_type']

class OrderSerializer(serializers.ModelSerializer):
    car_details = CarSerializer(source='car', read_only=True)
    buyer_details = UserSerializer(source='buyer', read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'car', 'buyer', 'order_date', 'status', 'car_details', 'buyer_details']
        read_only_fields = ['order_date']