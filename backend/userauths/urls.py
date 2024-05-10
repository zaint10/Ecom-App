from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView

app_name = "accounts"
urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("token/obtain", TokenObtainPairView.as_view()),
    path(
        "registration/",
        include("dj_rest_auth.registration.urls"),
    ),
]
