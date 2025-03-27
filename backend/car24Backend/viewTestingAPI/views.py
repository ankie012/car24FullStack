
import pymongo
from rest_framework.decorators import api_view

from django.http import JsonResponse


from pymongo import MongoClient
from rest_framework.response import Response


@api_view(['GET','POST'])
def index(request):

    courses = {
        'course_name': 'Python',
        'learn': ['flask','Django', 'tornado', 'FastAPi'],
        'course_provider': 'Youtube'
    }

    if request.method == 'GET':
        print(request.GET.get('search'))
        print('bhai please chal jaa')
        return Response(courses)
    
    elif request.method == 'POST':
        print('You Hit a POST method')
        data = request.data
        print('hi this is the data',data['email'])
        return Response(courses)
    elif request.method == 'PUT':
        print('You Hit a PUT method')
        return Response(courses)


from bson import ObjectId

@api_view(['GET'])
def rupesh(request):
    # MongoDB client setup
    client = MongoClient("mongodb://localhost:27017/")
    db = client.cars24
    collection = db.cars

    # Fetch data from the collection (assuming you want all documents)
    data = list(collection.find())  # Convert MongoDB cursor to a list

    # Convert ObjectId to string for JSON serialization
    for item in data:
        item['_id'] = str(item['_id'])  # Convert ObjectId to string

    if request.method == 'GET':
        print('hii i am fine')
        return Response(data)  # Return the data as a response


# @api_view(['GET'])
# def filterAPI(request):
#     # MongoDB client setup
    
#     client = MongoClient("mongodb://localhost:27017/")
#     db = client.cars24
#     collection = db.cars

#     data = list(collection.find({ 
#     "$and": [
#         { "brand": "Tata" },
#         { "model": "Safari" }
#     ]
# }))
#   # Convert MongoDB cursor to a list

#     # Convert ObjectId to string for JSON serialization
#     for item in data:
#         item['_id'] = str(item['_id'])  # Convert ObjectId to string

#     if request.method == 'GET':
#         print('FILTER API HITTED')
#         return Response(data)



def filterAPI(request):
    client = MongoClient("mongodb://localhost:27017/")
    db = client.cars24
    collection = db.cars

    query_params = {
        'brand': request.GET.get('brand'),
        'model': request.GET.get('model'),
        'price': request.GET.get('price'),
        'fuel_type': request.GET.get('fuel_type'),
        'body_type': request.GET.get('body_type'),
        'transmission': request.GET.get('transmission'),
        'seats': request.GET.get('seater'),
        'colors': request.GET.get('colors')
    }

    # Filtering out None values from the query_params
    query = {key: value for key, value in query_params.items() if value}

    # Handling price query
    if 'price' in query:
        try:
            price_value = float(query['price'])  # Ensure price is treated as a float
            query['price'] = {'$lte': price_value}  # Use the correct syntax for price
        except ValueError:
            return JsonResponse({'error': 'Invalid price value'}, status=400)

    data = collection.find(query, {'_id': 0})
    return JsonResponse(list(data), safe=False)

