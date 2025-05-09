from django.shortcuts import render, get_object_or_404
from django.db.models import Q, Avg, Count, Min, Max, Sum
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Car
from .serializers import CarSerializer, CarDetailSerializer, CarOrderSerializer

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

@api_view(['GET'])
def car_list(request):
    """
    List all cars with optional filtering
    """
    # Get query parameters
    brand = request.query_params.get('brand', None)
    model = request.query_params.get('model', None)
    year = request.query_params.get('year', None)
    min_price = request.query_params.get('min_price', None)
    max_price = request.query_params.get('max_price', None)
    fuel_type = request.query_params.get('fuel_type', None)
    is_sold = request.query_params.get('is_sold', None)
    
    # Start with all cars
    cars = Car.objects.all()
    
    # Apply filters if provided
    if brand:
        cars = cars.filter(brand__icontains=brand)
    if model:
        cars = cars.filter(model__icontains=model)
    if year:
        cars = cars.filter(year=year)
    if min_price:
        cars = cars.filter(price__gte=min_price)
    if max_price:
        cars = cars.filter(price__lte=max_price)
    if fuel_type:
        cars = cars.filter(fuel_type__icontains=fuel_type)
    if is_sold is not None:
        is_sold_bool = is_sold.lower() == 'true'
        cars = cars.filter(is_sold=is_sold_bool)
    
    serializer = CarSerializer(cars, many=True)
    return Response({
        "count": cars.count(),
        "cars": serializer.data
    })

@api_view(['GET'])
def search_cars(request):
    """
    Search for cars using a query parameter
    """
    query = request.query_params.get('q', '')
    if not query:
        return Response(
            {"error": "Please provide a search query with the 'q' parameter"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Search in multiple fields
    cars = Car.objects.filter(
        Q(brand__icontains=query) | 
        Q(model__icontains=query) | 
        Q(fuel_type__icontains=query) |
        Q(customer_name__icontains=query)
    )
    
    serializer = CarSerializer(cars, many=True)
    return Response({
        "count": cars.count(),
        "query": query,
        "results": serializer.data
    })

@api_view(['GET'])
def car_statistics(request):
    """
    Get statistics about the cars in the database
    """
    # Get all cars
    all_cars = Car.objects.all()
    sold_cars = Car.objects.filter(is_sold=True)
    available_cars = Car.objects.filter(is_sold=False)
    
    # Calculate statistics
    stats = {
        "total_cars": all_cars.count(),
        "sold_cars": sold_cars.count(),
        "available_cars": available_cars.count(),
        "avg_price": all_cars.aggregate(Avg('price'))['price__avg'],
        "min_price": all_cars.aggregate(Min('price'))['price__min'],
        "max_price": all_cars.aggregate(Max('price'))['price__max'],
        "avg_year": all_cars.aggregate(Avg('year'))['year__avg'],
        "avg_kms_driven": all_cars.aggregate(Avg('kms_driven'))['kms_driven__avg'],
        "brands": Car.objects.values('brand').annotate(count=Count('brand')).order_by('-count'),
        "fuel_types": Car.objects.values('fuel_type').annotate(count=Count('fuel_type')).order_by('-count'),
    }
    
    return Response(stats)

# Django ORM-based order views
class SelectOrders(APIView):
    def get(self, request):
        """
        Select cars based on query parameters
        """
        # Get query parameters
        brand = request.query_params.get('brand', None)
        model = request.query_params.get('model', None)
        is_sold = request.query_params.get('is_sold', None)
        
        # Start with all cars
        cars = Car.objects.all()
        
        # Apply filters if provided
        if brand:
            cars = cars.filter(brand__icontains=brand)
        if model:
            cars = cars.filter(model__icontains=model)
        if is_sold is not None:
            is_sold_bool = is_sold.lower() == 'true'
            cars = cars.filter(is_sold=is_sold_bool)
        
        serializer = CarSerializer(cars, many=True)
        return Response({
            "count": cars.count(),
            "cars": serializer.data
        })

class SubmitOrder(APIView):
    def post(self, request):
        """
        Submit an order for a car
        """
        serializer = CarOrderSerializer(data=request.data)
        if serializer.is_valid():
            # Get the car ID from the request
            car_id = request.data.get('car')
            try:
                # Find the car
                car = Car.objects.get(id=car_id)
                
                # Check if the car is already sold
                if car.is_sold:
                    return Response({"error": "Car is already sold"}, status=status.HTTP_400_BAD_REQUEST)
                
                # Mark the car as sold
                car.is_sold = True
                car.customer_name = request.data.get('user', 'Unknown')
                car.save()
                
                return Response({
                    "message": "Order submitted successfully",
                    "car": CarSerializer(car).data
                }, status=status.HTTP_201_CREATED)
            except Car.DoesNotExist:
                return Response({"error": "Car not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DisplayOrders(APIView):
    def get(self, request):
        """
        Display all cars with their order information
        """
        cars = Car.objects.all()
        serializer = CarSerializer(cars, many=True)
        return Response({
            "count": cars.count(),
            "cars": serializer.data
        })

class CarDetailView(APIView):
    """
    API view to retrieve, update or delete a car instance.
    """
    def get(self, request, pk):
        try:
            car = Car.objects.get(pk=pk)
            serializer = CarDetailSerializer(car)
            return Response(serializer.data)
        except Car.DoesNotExist:
            return Response(
                {"error": "Car not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    def put(self, request, pk):
        try:
            car = Car.objects.get(pk=pk)
            serializer = CarSerializer(car, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Car.DoesNotExist:
            return Response(
                {"error": "Car not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    def delete(self, request, pk):
        try:
            car = Car.objects.get(pk=pk)
            car.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Car.DoesNotExist:
            return Response(
                {"error": "Car not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
