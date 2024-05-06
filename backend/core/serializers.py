from rest_framework import serializers
from .models import Item, OrderItem, Order

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'title', 'price']

class OrderItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = OrderItem
        fields = ['id', 'item']

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    items = OrderItemSerializer(many=True)
    
    extra_kwargs = {'user': {'read_only': True}}

    class Meta:
        model = Order
        fields = ['id', 'user', 'items', 'start_date', 'ordered_date', 'ordered']
