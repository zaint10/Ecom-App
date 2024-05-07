from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import include, path, reverse
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.response import Response
from django.http import JsonResponse

schema_view = get_schema_view(
    openapi.Info(
        title="Ecommerce Store Backend",
        default_version="v1",
        description="Ecommerce Store API",
        terms_of_service="https://e-commerce-app/policies/terms/",
        contact=openapi.Contact(email="zat938@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.IsAdminUser],
)


def swagger_redirect_view(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("userauths:rest_login"))
    elif not request.user.is_staff:
        return JsonResponse(
            {"detail": "Forbidden. You do not have permission to access this page."},
            status=403,
        )
    return schema_view.with_ui("swagger", cache_timeout=0)(request)


urlpatterns = [
    path(
        "",
        swagger_redirect_view,
        name="swagger-ui",
    ),
    path("admin/", admin.site.urls),
    # Swagger Logout button point to LOGOUT_URL=/accounts/logout/ setting
    path("v1/", include("userauths.urls", namespace="userauths")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
