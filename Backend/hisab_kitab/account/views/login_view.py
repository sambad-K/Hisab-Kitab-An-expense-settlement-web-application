from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from ..serializers import LoginSerializer


class UserLogin(APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = LoginSerializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]
        user = authenticate(request, email=email, password=password)
        if user is None:
            return Response(
                {"message": "Error credentials"}, status=status.HTTP_400_BAD_REQUEST
            )
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token
        response = Response(
            {
                "message": "Login success",
            },
            status=status.HTTP_200_OK,
        )
        response.set_cookie(
            key="access_token",
            value=str(access),
            httponly=True,
            samesite="Lax",
            max_age=60 * 100,
        )
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            samesite="Lax",
            max_age=60 * 100,
        )
        return response
