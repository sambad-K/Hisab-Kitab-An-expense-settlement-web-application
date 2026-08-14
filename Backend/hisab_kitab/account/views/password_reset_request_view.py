from decouple import config
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..models import User
from ..serializers import ResetPasswordRequestSerializer


class RequestPasswordReset(generics.GenericAPIView):
    permission_classes = (AllowAny,)  
    serializer_class = ResetPasswordRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        user = User.objects.filter(email__iexact=email).first()

        if user:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = PasswordResetTokenGenerator().make_token(user)
            reset_url = f"{config('RESET_URL')}/resetpassword/{uid}/{token}"
        send_mail(
            subject="Reset password for HisabKitab",
            message=f"""
                    Namaskar
                    Your password reset link for Hisab Kitab is provided below:
                    {reset_url}
                    """,
            from_email=None,
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response(
            {"Email to respective accont will be sent if present"},
            status=status.HTTP_200_OK,
        )
