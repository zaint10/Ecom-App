from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView

app_name = "userauths"
urlpatterns = [
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/token/obtain", TokenObtainPairView.as_view()),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
]
