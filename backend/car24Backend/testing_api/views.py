from django.http import HttpResponse,JsonResponse
import pymongo
from pymongo import MongoClient 
import json

def mainPage(request):
    return HttpResponse("welcome to main page !!!")

def index(request):
    client = MongoClient("mongodb://localhost:27017/")
    db=client.cars24
    collection=db.cars
    data_cursor = collection.find({}, {"_id": 0})   
    data_list = list(data_cursor)  # Convert cursor to a list of dictionaries

    return JsonResponse(data_list, safe=False) 

