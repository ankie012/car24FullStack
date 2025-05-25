from rest_framework import serializers 
# This imports the serializers module from Django REST Framework (DRF).
# It gives us access to all the field types like CharField, IntegerField, DictField, etc., and base classes like Serializer, ModelSerializer, etc.

class TestDriveOrderSerializer(serializers.Serializer):
    user_email = serializers.EmailField()
    car_id = serializers.CharField()
    name = serializers.CharField()
    address = serializers.CharField()
    city = serializers.CharField()
    pincode = serializers.CharField()
    preferred_date = serializers.DateField(input_formats=['%Y-%m-%d', 'iso-8601'])
    preferred_time = serializers.CharField()
    additional_notes = serializers.CharField(required=False, allow_blank=True)

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
    Reg_number = serializers.CharField()
    km_driven=serializers.IntegerField()

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

class UserSignupSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=10)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    def validate_phone_number(self, value):
        """
        Check that the phone number is 10 digits
        """
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Phone number must be 10 digits")
        return value
    
    def validate_email(self, value):
        """
        Check that the email is valid
        """
        if not value:
            raise serializers.ValidationError("Email is required")
        return value
