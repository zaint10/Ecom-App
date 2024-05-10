from allauth.account.utils import user_pk_to_url_str
from allauth.utils import build_absolute_uri
from django.conf import settings
from django.urls import include, path, reverse
from rest_framework_simplejwt.views import TokenObtainPairView


def custom_url_generator(request, user, temp_key):
    path = reverse(
        "password_reset_confirm",
        args=[user_pk_to_url_str(user), temp_key],
    )

    if settings.PASSWORD_RESET_USE_SITES_DOMAIN:
        url = build_absolute_uri(None, path)
    else:
        url = build_absolute_uri(request, path)

    url = url.replace("%3F", "?")

    return url


app_name = "accounts"
urlpatterns = [
    # path(
    #     "password/reset/confirm/<uidb64>/<token>/",
    #     PasswordResetConfirmView.as_view(),
    #     name="password_reset_confirm",
    # ),
    path("", include("dj_rest_auth.urls")),
    path("token/obtain", TokenObtainPairView.as_view()),
    path(
        "registration/",
        include("dj_rest_auth.registration.urls"),
    ),
]
