from bson.json_util import dumps # auto handle this error dump(data)
from django.http import HttpResponse,JsonResponse
import pymongo
from pymongo import MongoClient 
import json

# todo Database connections :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
client = MongoClient("mongodb://localhost:27017/")
db=client.cars24
collection=db.cars 

def mainPage(request):
    return HttpResponse("welcome to main page !!!")

def carListAPI(request):
    data = collection.find({},{'_id':0})    
    # data = dumps(data,indent=3)  
    data=list(data) 
    return JsonResponse(data, safe=False) 

def filter_api(request):
    # Get individual parameters from the URL (query string)
    brand_param = request.GET.get('brand')
    fuel_type_param = request.GET.get('fuel_type')
    body_type_param = request.GET.get('body_type')

    # Build query dictionary
    query = {}

    # If brand is provided, add it to the query
    if brand_param:
        query["brand"] = brand_param

    # If fuel_type is provided, process it and add it to the query
    if fuel_type_param:
        fuel_types = fuel_type_param.split(',')  # Split the comma-separated values into a list
        query["fuel_type"] = {"$in": fuel_types}  # MongoDB's $in operator allows multi-select filter

    # If body_type is provided, process it and add it to the query
    if body_type_param:
        body_types = body_type_param.split(',')  # Split the comma-separated values into a list
        query["body_type"] = {"$in": body_types}  # MongoDB's $in operator allows multi-select filter

    # Execute the query on the MongoDB collection
    result = collection.find(query)

    # Convert MongoDB result to list and handle serialization
    result_list = list(result)

    # Convert ObjectId to string for JSON serialization
    for item in result_list:
        item["_id"] = str(item["_id"])  # Convert ObjectId to string

    return JsonResponse({"results": result_list}, safe=False)
