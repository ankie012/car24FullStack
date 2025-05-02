from django.db import models
from cars.models import Car

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=10, choices=[("buyer", "Buyer"), ("seller", "Seller")], default="buyer")
    
    def __str__(self):
        return self.name

class Order(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='orders')
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchases')
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=[("pending", "Pending"), ("confirmed", "Confirmed"), ("cancelled", "Cancelled")], default="pending")
    
    def __str__(self):
        return f"Order {self.id} - {self.car} by {self.buyer}"
