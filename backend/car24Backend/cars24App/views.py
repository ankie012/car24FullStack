from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from .serializers import CarSerializer
from .serializers import CarCardSerializer
from pymongo import MongoClient 
from bson import ObjectId 
import re 


# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client.cars24
collection = db.cars


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

        # Convert ObjectIds to strings 
        for item in data: 
            item['_id'] = str(item['_id'])  

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

class CarDetailView(APIView):
    def get(self, request, car_id):
        try:
            # Convert string ID to MongoDB ObjectId
            car = collection.find_one({"_id": ObjectId(car_id)})
            
            if not car:
                return Response({"error": "Car not found"}, status=status.HTTP_404_NOT_FOUND)
            
            # Convert ObjectId to string for serialization
            car['_id'] = str(car['_id'])
            
            serializer = CarSerializer(car)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)