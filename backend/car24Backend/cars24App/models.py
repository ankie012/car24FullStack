from django.db import models
from django.contrib.auth.hashers import make_password
from datetime import datetime

# Create your models here.
class UserSignup:
    """
    A class to represent user signup data structure for MongoDB.
    This is not a Django model since we're using MongoDB directly.
    """
    @staticmethod
    def create_user_document(phone_number, email, password):
        """
        Create a user document with hashed password for MongoDB
        """
        return {
            "phone_number": phone_number,
            "email": email,
            "password": make_password(password),  # Hash the password
            "created_at": datetime.now().isoformat(),
        }

class TestDriveOrder:
    """
    A class to represent test drive order data structure for MongoDB.
    This is not a Django model since we're using MongoDB directly.
    """
    @staticmethod
    def create_order_document(user_email, car_id, name, address, city, pincode, preferred_date, preferred_time, additional_notes=None):
        """
        Create an order document for MongoDB
        """
        # Convert preferred_date to string format if it's a date object
        if hasattr(preferred_date, 'isoformat'):
            preferred_date = preferred_date.isoformat()
            
        return {
            "user_email": user_email,
            "car_id": car_id,
            "name": name,
            "address": address,
            "city": city,
            "pincode": pincode,
            "preferred_date": preferred_date,
            "preferred_time": preferred_time,
            "additional_notes": additional_notes,
            "status": "pending",  # pending, confirmed, completed, cancelled
            "created_at": datetime.now().isoformat(),
        }
