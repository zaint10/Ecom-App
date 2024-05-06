from django.contrib.auth.models import User
from django.db import models


class Item(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=19, decimal_places=4)


class OrderItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)


class Order(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='orders')
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'Ordered by user: {self.user.username}'
