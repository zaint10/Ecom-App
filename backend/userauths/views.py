from rest_framework import permissions, status
from rest_framework.generics import (
    ListCreateAPIView,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from userauths.models import User

from .serializers import ItemSerializer, PasswordResetTokenVerifySerializer

# Create your views here.


class ItemListCreateAPIView(ListCreateAPIView):
    serializer_class = ItemSerializer


class PasswordResetTokenVerifyAPIView(APIView):
    serializer_class = PasswordResetTokenVerifySerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data.get("token", "")
        uid = serializer.validated_data.get("uid", "")

        # Get the user based on uid
        try:
            user = User.objects.get(pk=uid)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        if user.token_generator.check_token(user, token):
            return Response(
                {
                    "detail": "Password reset token is valid. You can proceed to reset your password."
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "detail": "Invalid or expired password reset token. Please make sure you have the correct token and try again."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
