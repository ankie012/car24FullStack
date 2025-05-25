from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from .serializers import CarSerializer, CarCardSerializer, UserSignupSerializer, TestDriveOrderSerializer
from .models import UserSignup, TestDriveOrder
from pymongo import MongoClient 
from bson import ObjectId 
import re
from datetime import datetime
from django.contrib.auth.hashers import make_password



# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client.cars24
collection = db.cars
user_collection = db.users  # Collection for user signup data
test_drive_collection = db.test_drive_orders  # Collection for test drive orders


class FilterCarsView(APIView):  
    def get(self, request): 
        multi_valued_fields = ['brand', 'model', 'fuel_type', 'body_type', 'transmission', 'colors', 'seater', 'RTO', 'Owners' ,'Discount']
        query = {}  

        # Multi-valued filters 
        for field in multi_valued_fields:
            values = request.GET.getlist(field)  

            if values:  
                if field in ['transmission', 'colors','Discount']:   
                    # Use regex for partial, case-insensitive match
                    query[field] = {
                        "$in": [re.compile(f".*{re.escape(val)}.*", re.IGNORECASE) for val in values] 
                    }  
                elif field == 'seater':
                    # Assuming seater is an integer field
                    query[field] = {"$in": [int(v) for v in values]}  
                else: 
                    query[field] = {"$in": values}  

        # Price filtering
        min_price = request.GET.get('min_price')  
        max_price = request.GET.get('max_price')

        if min_price or max_price:
            price_query = {}  
            if min_price: 
                price_query["$gte"] = int(min_price) 
            if max_price:
                price_query["$lte"] = int(max_price) 
            
            if price_query:
                query["price"] = price_query 
        # Search query based filter 
        search_query = request.GET.get('search')
        if search_query:
            regex = re.compile(f".*{re.escape(search_query)}.*", re.IGNORECASE)
            query["$or"] = [  
                {"brand": regex},
                {"model": regex},
                {"fuel_type": regex} 
                # Add more fields as needed 
            ]  

        # Query MongoDB
        data = list(collection.find(query)) 

        # Convert ObjectIds to strings and ensure all required fields exist
        for item in data: 
            item['_id'] = str(item['_id'])
            # Add default values for any missing fields required by the serializer
            if 'Reg_number' not in item:
                item['Reg_number'] = ""
            if 'km_driven' not in item:
                item['km_driven'] = 0

        serializer = CarSerializer(data, many=True)   
        return Response(serializer.data, status=status.HTTP_200_OK) 


class CarDetailView(APIView):
    def get(self, request, car_id):
        try:
            # Convert string ID to MongoDB ObjectId
            car = collection.find_one({"_id": ObjectId(car_id)})
            
            if not car:
                return Response({"error": "Car not found"}, status=status.HTTP_404_NOT_FOUND)
            
            # Convert ObjectId to string for serialization
            car['_id'] = str(car['_id'])
            
            # Add default values for any missing fields required by the serializer
            if 'Reg_number' not in car:
                car['Reg_number'] = ""
            if 'km_driven' not in car:
                car['km_driven'] = 0
            
            serializer = CarSerializer(car)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# class carListApi(APIView):
#     def get(self,request):
#         cars = list(collection.find()) 
#         for item in cars:
#             item["_id"] = str(item["_id"]) 
#         serializer=CarCardSerializer(cars,many=True)  
#         return Response(serializer.data)  

# Removing duplicate CarDetailView class
# The first implementation above will be used

class UserSignupView(APIView):
    def post(self, request):
        try:
            serializer = UserSignupSerializer(data=request.data)
            
            if serializer.is_valid():
                # Check if user with this phone number or email already exists
                existing_user = user_collection.find_one({
                    "$or": [
                        {"phone_number": serializer.validated_data['phone_number']},
                        {"email": serializer.validated_data['email']}
                    ]
                })
                
                if existing_user:
                    return Response(
                        {"message": "User with this phone number or email already exists"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Create user document using the model
                user_data = {
                    "phone_number": serializer.validated_data['phone_number'],
                    "email": serializer.validated_data['email'],
                    "password": make_password(serializer.validated_data['password']),
                    "created_at": datetime.now().isoformat()
                }
                
                # Insert into MongoDB
                result = user_collection.insert_one(user_data)
                
                if result.inserted_id:
                    return Response(
                        {"message": "User registered successfully", "user_id": str(result.inserted_id)},
                        status=status.HTTP_201_CREATED
                    )
                else:
                    return Response(
                        {"message": "Failed to register user"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"message": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
class TestDriveOrderView(APIView):
    def get(self, request, order_id=None):
        try:
            # If order_id is provided, return that specific order
            if order_id:
                try:
                    order = test_drive_collection.find_one({"_id": ObjectId(order_id)})
                    if not order:
                        return Response(
                            {"message": "Order not found"},
                            status=status.HTTP_404_NOT_FOUND
                        )
                    
                    # Convert ObjectId to string
                    order['_id'] = str(order['_id'])
                    
                    # If the order has a car_id, fetch the car details
                    if 'car_id' in order:
                        try:
                            car = collection.find_one({"_id": ObjectId(order['car_id'])})
                            if car:
                                car['_id'] = str(car['_id'])
                                order['car'] = car
                        except:
                            # If car not found, just continue
                            pass
                    
                    return Response(order, status=status.HTTP_200_OK)
                except:
                    return Response(
                        {"message": "Invalid order ID format"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            # Otherwise, get user email from query parameters
            user_email = request.GET.get('user_email')
            
            if not user_email:
                return Response(
                    {"message": "User email is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Find all orders for this user
            orders = list(test_drive_collection.find({"user_email": user_email}))
            
            # Convert ObjectIds to strings
            for order in orders:
                order['_id'] = str(order['_id'])
                
                # If the order has a car_id, fetch the car details
                if 'car_id' in order:
                    try:
                        car = collection.find_one({"_id": ObjectId(order['car_id'])})
                        if car:
                            car['_id'] = str(car['_id'])
                            order['car'] = car
                    except:
                        # If car not found, just continue
                        pass
            
            return Response(orders, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def post(self, request):
        try:
            serializer = TestDriveOrderSerializer(data=request.data)
            
            if serializer.is_valid():
                # Verify user exists
                user_email = serializer.validated_data['user_email']
                user = user_collection.find_one({"email": user_email})
                
                if not user:
                    return Response(
                        {"message": "User not found with this email"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Verify car exists
                car_id = serializer.validated_data['car_id']
                try:
                    car = collection.find_one({"_id": ObjectId(car_id)})
                    if not car:
                        return Response(
                            {"message": "Car not found with this ID"},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                except:
                    return Response(
                        {"message": "Invalid car ID format"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Create order document using the model
                # Convert preferred_date to string format before passing to create_order_document
                preferred_date = serializer.validated_data['preferred_date']
                
                order_data = TestDriveOrder.create_order_document(
                    user_email=user_email,
                    car_id=car_id,
                    name=serializer.validated_data['name'],
                    address=serializer.validated_data['address'],
                    city=serializer.validated_data['city'],
                    pincode=serializer.validated_data['pincode'],
                    preferred_date=preferred_date,
                    preferred_time=serializer.validated_data['preferred_time'],
                    additional_notes=serializer.validated_data.get('additional_notes', '')
                )
                
                # Insert into MongoDB
                result = test_drive_collection.insert_one(order_data)
                
                if result.inserted_id:
                    return Response(
                        {
                            "message": "Test drive order created successfully", 
                            "order_id": str(result.inserted_id)
                        },
                        status=status.HTTP_201_CREATED
                    )
                else:
                    return Response(
                        {"message": "Failed to create test drive order"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"message": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
    def get(self, request):
        try:
            # Get user email from query parameters
            user_email = request.GET.get('user_email')
            
            if not user_email:
                return Response(
                    {"message": "User email is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Find all orders for this user
            orders = list(test_drive_collection.find({"user_email": user_email}))
            
            # Convert ObjectIds to strings
            for order in orders:
                order['_id'] = str(order['_id'])
                
                # If the order has a car_id, fetch the car details
                if 'car_id' in order:
                    try:
                        car = collection.find_one({"_id": ObjectId(order['car_id'])})
                        if car:
                            car['_id'] = str(car['_id'])
                            order['car'] = car
                    except:
                        # If car not found, just continue
                        pass
            
            return Response(orders, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )