from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'brand', 'model', 'year', 'price', 'fuel_type', 'kms_driven', 'customer_name', 'is_sold']

class CarDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for detailed car information with additional calculated fields
    """
    age = serializers.SerializerMethodField()
    price_per_km = serializers.SerializerMethodField()
    
    class Meta:
        model = Car
        fields = ['id', 'brand', 'model', 'year', 'price', 'fuel_type', 
                 'kms_driven', 'customer_name', 'is_sold', 'age', 'price_per_km']
    
    def get_age(self, obj):
        """Calculate the age of the car in years"""
        import datetime
        current_year = datetime.datetime.now().year
        return current_year - obj.year
    
    def get_price_per_km(self, obj):
        """Calculate price per kilometer"""
        if obj.kms_driven > 0:
            return round(obj.price / obj.kms_driven, 2)
        return 0

class CarOrderSerializer(serializers.Serializer):
    uid = serializers.IntegerField(read_only=True)
    user = serializers.CharField()
    car = serializers.CharField()
    price = serializers.IntegerField()

