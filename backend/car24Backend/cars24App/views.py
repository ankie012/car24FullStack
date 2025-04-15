from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CarSerializer
from pymongo import MongoClient

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client.cars_dealership
collection = db.cars

class FilterCarsView(APIView):
    def get(self, request):
        multi_valued_fields = ['brand', 'model', 'fuel_type', 'body_type', 'transmission', 'colors', 'RTO', 'owners']
        query = {}

        # Multi-valued filters
        for field in multi_valued_fields:
            values = request.GET.getlist(field)
            if values:
                query[field] = {"$in": values}

        # Single-value filters
        price = request.GET.get('price')
        if price:
            try:
                query['price'] = {'$lte': int(price)}
            except ValueError:
                return Response({'error': 'Invalid price value'}, status=status.HTTP_400_BAD_REQUEST)

        seats = request.GET.get('seats')
        if seats:
            try:
                query['seater'] = int(seats)
            except ValueError:
                return Response({'error': 'Invalid seats value'}, status=status.HTTP_400_BAD_REQUEST)

        # Query MongoDB
        data = list(collection.find(query))

        # Convert ObjectIds to strings
        for item in data:
            item['_id'] = str(item['_id'])

        # Serialize
        serializer = CarSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['GET'])
# def mainPage(request):
#     return Response({"message": "welcome to main page !!!"})

# @api_view(['GET'])
# def carListAPI(request):
#     data = list(collection.find()) # convert cursor to list
#     # Convert ObjectId to string for JSON serialization
#     for item in data:
#         item["_id"] = str(item["_id"])   
#     return Response(data,safe=False)  
 