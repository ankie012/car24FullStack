from django.db import models

class Car(models.Model):
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    price = models.FloatField()
    fuel_type = models.CharField(max_length=50)
    kms_driven = models.IntegerField()
    customer_name = models.CharField(max_length=100)
    is_sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"
