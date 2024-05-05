from django.contrib import admin
from core.models import Item, OrderItem, Order

# Register your models here.
admin.register(Item)
admin.register(OrderItem)
admin.register(Order)

