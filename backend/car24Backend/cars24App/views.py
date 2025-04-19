from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CarSerializer
from .serializers import CarCardSerializer
from pymongo import MongoClient
import re 


# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client.cars_dealership
collection = db.cars

class FilterCarsView(APIView):
    def get(self, request): 
        multi_valued_fields = ['brand', 'model', 'fuel_type', 'body_type', 'transmission', 'colors','seater', 'RTO', 'owners']
        query = {}

        # Multi-valued filters
        for field in multi_valued_fields:
            values = request.GET.getlist(field)
            
            if values:
                if field == 'transmission':  # Use regex for partial, case-insensitive match
                    query[field] = {
                        "$in": [re.compile(f".*{re.escape(val)}.*", re.IGNORECASE) for val in values]
                    }
                if field == 'colors':  # Use regex for partial, case-insensitive match
                    query[field] = {
                        "$in": [re.compile(f".*{re.escape(val)}.*", re.IGNORECASE) for val in values]
                    }
                if field=='seater':
                    query[field]={values} 
                else: 
                    query[field] = {"$in": values}
                       
        
        # Single-value filters
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


        # Query MongoDB
        data = list(collection.find(query))

        # Convert ObjectIds to strings
        for item in data:
            item['_id'] = str(item['_id'])

        # Serialize
        serializer = CarSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



# class carListApi(APIView):
#     def get(self,request):
#         cars = list(collection.find()) 
#         for item in cars:
#             item["_id"] = str(item["_id"]) 
#         serializer=CarCardSerializer(cars,many=True)  
#         return Response(serializer.data)  
 