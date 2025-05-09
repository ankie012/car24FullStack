from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.conf import settings
from pymongo import MongoClient
from bson import ObjectId
import json
import re

class MongoDBConnection:
    def __init__(self):
        self.client = MongoClient(host=settings.DATABASES['default']['HOST'], 
                                 port=settings.DATABASES['default']['PORT'])
        self.db = self.client[settings.DATABASES['default']['NAME']]

@api_view(['GET'])
def mongo_car_list(request):
    """
    List all cars directly from MongoDB
    """
    try:
        # Connect to MongoDB
        connection = MongoDBConnection()
        
        # Get cars collection - the collection name is typically app_name_model_name in lowercase
        cars_collection = connection.db.cars_car
        
        # Query cars
        cars = list(cars_collection.find())
        
        # Process ObjectIds before serialization
        for car in cars:
            if '_id' in car:
                car['_id'] = str(car['_id'])
        
        return Response({
            "count": len(cars),
            "cars": cars
        })
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def mongo_car_detail(request, car_id):
    """
    Get details of a specific car directly from MongoDB
    """
    try:
        # Connect to MongoDB
        connection = MongoDBConnection()
        
        # Get cars collection
        cars_collection = connection.db.cars_car
        
        # Query car by ID
        car = cars_collection.find_one({"_id": ObjectId(car_id)})
        
        if not car:
            return Response({"error": "Car not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Process ObjectId before serialization
        car['_id'] = str(car['_id'])
        
        return Response(car)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def mongo_car_brands(request):
    """
    Get list of all car brands with counts directly from MongoDB
    """
    try:
        # Connect to MongoDB
        connection = MongoDBConnection()
        
        # Get cars collection
        cars_collection = connection.db.cars_car
        
        # Aggregate to get brands and counts
        pipeline = [
            {"$group": {"_id": "$brand", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        
        brands = list(cars_collection.aggregate(pipeline))
        
        # Format the results
        result = [{"brand": brand["_id"], "count": brand["count"]} for brand in brands]
        
        return Response(result)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def mongo_car_search(request):
    """
    Advanced search for cars directly from MongoDB
    """
    try:
        # Connect to MongoDB
        connection = MongoDBConnection()
        
        # Get cars collection
        cars_collection = connection.db.cars_car
        
        # Get query parameters
        query = request.query_params.get('q', '')
        brand = request.query_params.get('brand')
        model = request.query_params.get('model')
        min_year = request.query_params.get('min_year')
        max_year = request.query_params.get('max_year')
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        fuel_type = request.query_params.get('fuel_type')
        is_sold = request.query_params.get('is_sold')
        
        # Build MongoDB query
        mongo_query = {}
        
        # Add text search if query provided
        if query:
            # Using regex for case-insensitive search across multiple fields
            regex_pattern = re.compile(query, re.IGNORECASE)
            mongo_query['$or'] = [
                {'brand': regex_pattern},
                {'model': regex_pattern},
                {'fuel_type': regex_pattern},
                {'customer_name': regex_pattern}
            ]
        
        # Add filters
        if brand:
            mongo_query['brand'] = {'$regex': brand, '$options': 'i'}
        if model:
            mongo_query['model'] = {'$regex': model, '$options': 'i'}
        
        # Year range
        year_query = {}
        if min_year:
            year_query['$gte'] = int(min_year)
        if max_year:
            year_query['$lte'] = int(max_year)
        if year_query:
            mongo_query['year'] = year_query
        
        # Price range
        price_query = {}
        if min_price:
            price_query['$gte'] = float(min_price)
        if max_price:
            price_query['$lte'] = float(max_price)
        if price_query:
            mongo_query['price'] = price_query
        
        if fuel_type:
            mongo_query['fuel_type'] = {'$regex': fuel_type, '$options': 'i'}
        
        if is_sold is not None:
            mongo_query['is_sold'] = is_sold.lower() == 'true'
        
        # Execute query
        cars = list(cars_collection.find(mongo_query))
        
        # Process ObjectIds before serialization
        for car in cars:
            if '_id' in car:
                car['_id'] = str(car['_id'])
        
        return Response({
            "count": len(cars),
            "query": mongo_query,
            "cars": cars
        })
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def mongo_car_statistics(request):
    """
    Get statistics about cars directly from MongoDB
    """
    try:
        # Connect to MongoDB
        connection = MongoDBConnection()
        
        # Get cars collection
        cars_collection = connection.db.cars_car
        
        # Total cars
        total_cars = cars_collection.count_documents({})
        
        # Sold and available cars
        sold_cars = cars_collection.count_documents({"is_sold": True})
        available_cars = cars_collection.count_documents({"is_sold": False})
        
        # Price statistics
        price_stats = list(cars_collection.aggregate([
            {
                "$group": {
                    "_id": None,
                    "avg_price": {"$avg": "$price"},
                    "min_price": {"$min": "$price"},
                    "max_price": {"$max": "$price"}
                }
            }
        ]))
        
        # Year and kms driven statistics
        other_stats = list(cars_collection.aggregate([
            {
                "$group": {
                    "_id": None,
                    "avg_year": {"$avg": "$year"},
                    "avg_kms_driven": {"$avg": "$kms_driven"}
                }
            }
        ]))
        
        # Brand distribution
        brands = list(cars_collection.aggregate([
            {"$group": {"_id": "$brand", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]))
        
        # Fuel type distribution
        fuel_types = list(cars_collection.aggregate([
            {"$group": {"_id": "$fuel_type", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]))
        
        # Compile statistics
        stats = {
            "total_cars": total_cars,
            "sold_cars": sold_cars,
            "available_cars": available_cars,
            "brands": [{"brand": b["_id"], "count": b["count"]} for b in brands],
            "fuel_types": [{"fuel_type": f["_id"], "count": f["count"]} for f in fuel_types]
        }
        
        # Add price statistics if available
        if price_stats:
            stats.update({
                "avg_price": price_stats[0]["avg_price"],
                "min_price": price_stats[0]["min_price"],
                "max_price": price_stats[0]["max_price"]
            })
        
        # Add other statistics if available
        if other_stats:
            stats.update({
                "avg_year": other_stats[0]["avg_year"],
                "avg_kms_driven": other_stats[0]["avg_kms_driven"]
            })
        
        return Response(stats)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)