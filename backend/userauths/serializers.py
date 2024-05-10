from allauth.account.utils import user_pk_to_url_str
from allauth.utils import build_absolute_uri
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordResetSerializer, UserDetailsSerializer
from django.urls import reverse
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from userauths.models import Item, Profile, User


class UserCreateSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)
    phone = PhoneNumberField(required=True)

    def get_cleaned_data(self):
        super(UserCreateSerializer, self).get_cleaned_data()
        return {
            "username": self.validated_data.get("username", ""),
            "password1": self.validated_data.get("password1", ""),
            "password2": self.validated_data.get("password2", ""),
            "email": self.validated_data.get("email", ""),
            "first_name": self.validated_data.get("first_name", ""),
            "last_name": self.validated_data.get("last_name", ""),
            "phone": self.validated_data.get("phone", ""),
        }

    class Meta:
        model = User


class UserSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ("fullname", "phone")


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = "__all__"


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["fullname"] = user.fullname
        token["email"] = user.email
        token["username"] = user.username
        try:
            token["vendor_id"] = user.vendor.id
        except Exception:
            token["vendor_id"] = 0

        return token


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item


def custom_url_generator(request, user, temp_key):
    path = reverse(
        "accounts:password_reset_confirm",
        args=[user_pk_to_url_str(user), temp_key],
    )

    url = build_absolute_uri(request, path)

    url = url.replace("%3F", "?")

    return url


class CustomPasswordResetSerializer(PasswordResetSerializer):
    pass


class PasswordResetTokenVerifySerializer(serializers.Serializer):
    token = serializers.CharField()
    uid = serializers.CharField()
