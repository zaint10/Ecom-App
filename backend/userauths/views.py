from django.shortcuts import render
from .serializers import ItemSerializer
from rest_framework.generics import ListCreateAPIView

# Create your views here.


class ItemListCreateAPIView(ListCreateAPIView):
    serializer_class = ItemSerializer
