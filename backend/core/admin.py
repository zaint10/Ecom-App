from django.contrib import admin

from core.models import Item, Order, OrderItem

# Register your models here.
admin.register(Item)
admin.register(OrderItem)
admin.register(Order)
