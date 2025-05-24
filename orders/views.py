from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Order, User
from cars.models import Car
from .serializers import OrderSerializer, UserSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=True, methods=['post'])
    def book_test_drive(self, request, pk=None):
        user = self.get_object()
        testdrive_date = request.data.get('testdrive_date')
        testdrive_time = request.data.get('testdrive_time')
        car_id = request.data.get('car_id')
        
        if not testdrive_date or not testdrive_time:
            return Response(
                {"error": "Both test drive date and time are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if not car_id:
            return Response(
                {"error": "Car ID is required for test drive booking"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            car = Car.objects.get(id=car_id)
        except Car.DoesNotExist:
            return Response(
                {"error": f"Car with ID {car_id} not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
            
        user.testdrive_date = testdrive_date
        user.testdrive_time = testdrive_time
        user.testdrive_car = car
        user.save()
        
        return Response(
            {"success": "Test drive booked successfully", 
             "testdrive_date": testdrive_date, 
             "testdrive_time": testdrive_time,
             "car": {
                 "id": car.id,
                 "make": car.make,
                 "model": car.model,
                 "year": car.year
             }}, 
            status=status.HTTP_200_OK
        )

class OrderListCreate(APIView):
    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            car = Car.objects.filter(id=request.data.get('car')).first()
            if car and car.is_sold:
                return Response({"error": "Car is already sold"}, status=status.HTTP_400_BAD_REQUEST)
            
            order = serializer.save()

            if car:
                car.is_sold = True
                car.save()

            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetail(APIView):
    def get(self, request, pk):
        try:
            order = Order.objects.get(id=pk)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderSerializer(order)
        return Response(serializer.data)
        
    def put(self, request, pk):
        try:
            order = Order.objects.get(id=pk)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
            
        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            order = Order.objects.get(id=pk)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
            
        # If order is deleted, mark car as not sold
        car = order.car
        car.is_sold = False
        car.save()
        
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
