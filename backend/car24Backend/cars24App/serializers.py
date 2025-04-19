from rest_framework import serializers 
# This imports the serializers module from Django REST Framework (DRF).
# It gives us access to all the field types like CharField, IntegerField, DictField, etc., and base classes like Serializer, ModelSerializer, etc.

class CarSerializer(serializers.Serializer):
    _id = serializers.CharField()
    brand = serializers.CharField()
    model = serializers.CharField()
    variant = serializers.CharField()
    year = serializers.IntegerField()
    price = serializers.IntegerField()
    fuel_type = serializers.CharField()
    body_type = serializers.CharField()
    transmission = serializers.CharField()
    colors = serializers.CharField()
    seater = serializers.IntegerField()
    engine = serializers.DictField()
    static_features = serializers.ListField(child=serializers.CharField())
    images = serializers.CharField()
    Owners = serializers.ListField(child=serializers.CharField())
    RTO = serializers.CharField()
    Discount = serializers.CharField()

class CarCardSerializer(serializers.Serializer):
    _id=serializers.CharField()
    brand=serializers.CharField() 
    model=serializers.CharField()
    transmission=serializers.CharField()
    variant=serializers.CharField()
    price=serializers.IntegerField()
    fuel_type = serializers.CharField()
    year=serializers.IntegerField()
    images=serializers.CharField()
