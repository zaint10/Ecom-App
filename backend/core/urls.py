from django.urls import path
from .views import ItemListCreateAPIView, ItemDetailAPIView, OrderListCreateAPIView, OrderDetailAPIView

app_name = 'core'

urlpatterns = [
    path('items/', ItemListCreateAPIView.as_view(), name='item-list-create'),
    path('items/<int:pk>/', ItemDetailAPIView.as_view(), name='item-detail'),
    path('orders/', OrderListCreateAPIView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),
]