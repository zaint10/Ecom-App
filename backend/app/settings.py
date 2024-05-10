import os
from datetime import timedelta
from urllib.parse import urlparse

from corsheaders.defaults import default_headers

from . import env

ENVIRONMENT = env("ENVIRONMENT", default="development")

DEBUG = env.bool("DEBUG", default=True)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = env(
    "SECRET_KEY", default="-05sgp9!deq=q1nltm@^^2cc+v29i(tyybv3v2t77qi66czazj"
)

# The Default frontend url (Assuming its developed in react)
FRONTEND_URL = env(
    "FRONTEND_URL",
    default="http://localhost:3000",
)
FRONTEND_HOST = urlparse(FRONTEND_URL).hostname
print(FRONTEND_URL)
BACKEND_HOST = env("BACKEND_HOST", default="localhost")
ALLOWED_HOSTS = [
    BACKEND_HOST,
    FRONTEND_HOST,
]

if ENVIRONMENT == "development":
    ALLOWED_HOSTS.append("*")
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ORIGIN_WHITELIST = [FRONTEND_URL]

CORS_ALLOW_HEADERS = (
    *default_headers,
    # Add custom headers
)


INSTALLED_APPS = [
    # customize admin ui
    "jazzmin",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    # Django Rest Framework
    "rest_framework",
    "rest_framework.authtoken",
    "dj_rest_auth",
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth.registration",
    # Third Party
    "phonenumber_field",
    # API documentation
    "drf_yasg",
    # Custom Apps
    "userauths",
    "store",
    "customer",
    "vendor",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = "app.urls"
TEMPLATE_URL = "templates"
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, TEMPLATE_URL)],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = "/dj_static/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "dj_static")]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

WSGI_APPLICATION = "app.wsgi.application"

AUTH_USER_MODEL = "userauths.User"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Authentication setting

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

# dj_rest_auth settings
REST_AUTH = {
    "USE_JWT": True,
    "JWT_AUTH_COOKIE": "_auth",
    "JWT_AUTH_REFRESH_COOKIE": "_auth_refresh",
    "JWT_AUTH_HTTPONLY": False,
    "JWT_AUTH_RETURN_EXPIRATION": True,
    "REGISTER_SERIALIZER": "userauths.serializers.UserCreateSerializer",
    "USER_DETAILS_SERIALIZER": "userauths.serializers.UserSerializer",
    "PASSWORD_RESET_USE_SITES_DOMAIN": DEBUG,
}

# simplejwt setting (tokens)
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "TOKEN_OBTAIN_SERIALIZER": "userauths.serializers.MyTokenObtainPairSerializer",
}


# Dj-Allauth Settings for Accounts
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_USERNAME_REQUIRED = True
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_ADAPTER = "userauths.adapter.CustomUserCreateAdapter"
ACCOUNT_EMAIL_VERIFICATION = "none"
ACCOUNT_EMAIL_SUBJECT_PREFIX = "[E-Commerce Store] "
ACCOUNT_PASSWORD_RESET_TOKEN_GENERATOR = (
    "allauth.account.forms.EmailAwarePasswordResetTokenGenerator"
)
PASSWORD_RESET_TIMEOUT = 60 * 60 * 24 * 3  # 3 Days

# Email Backend settings
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST = "smtp.office365.com"
EMAIL_HOST_USER = "codebyzain@outlook.com"
EMAIL_HOST_PASSWORD = "xzmqfespkrkewbrc"
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# Site settings
SITE_DOMAIN = BACKEND_HOST
SITES_ENABLED = True
SITE_ID = 2

LOGOUT_URL = "/auth/logout"


# Admin Panel Settings
JAZZMIN_SETTINGS = {}

JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": True,
    "brand_small_text": False,
    "brand_colour": "navbar-success",
    "accent": "accent-lime",
    "navbar": "navbar-success navbar-dark",
    "no_navbar_border": True,
    "navbar_fixed": True,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": False,
    "sidebar": "sidebar-dark-primary",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": True,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "cyborg",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success",
    },
}

if ENVIRONMENT == "production":
    AUTH_PASSWORD_VALIDATORS = [
        {
            "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
        },
        {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
        {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
        {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
    ]
    SESSION_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_REDIRECT_EXEMPT = []
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    REST_AUTH["PASSWORD_RESET_USE_SITES_DOMAIN"] = True
    SITES_ENABLED = True
    SITE_ID = 2
