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

# def filter_api(request):
#     query_params={
#     'brand' : request.GET.get('brand'),
#     'model' : request.GET.get('model'),
#     'price' : request.GET.get('price'),
#     'fuel_type' : request.GET.get('fuel_type'),
#     'body_type' : request.GET.get('body_type'),
#     'transmission' : request.GET.get('transmission'),
#     'seats' : request.GET.get('seater'),
#     'colors' : request.GET.get('colors') }  

#     query={key:value for key,value in query_params.items() if value}  
#     if 'price' in query:
#         query['price']={'$lte':{query['price']}} 

#     data=collection.find(query,{'_id':0})
#     return JsonResponse(list(data),safe=False)
