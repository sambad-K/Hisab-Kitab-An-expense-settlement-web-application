from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from .user_manager_model import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=20, unique=True)
    picture = models.ImageField(upload_to="picture/", null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "username"]
    objects = UserManager()
