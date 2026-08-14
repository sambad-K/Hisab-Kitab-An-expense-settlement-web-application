from django.contrib.auth import get_user_model
from django.db import models

from .group_model import Group

User = get_user_model()
ROLES_CHOICES = (("NORMAL", "Normal"), ("ADMIN", "Admin"))


class GroupMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="member")
    role = models.CharField(max_length=10, choices=ROLES_CHOICES, default="NORMAL")
    joined_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)

    class Meta:
        unique_together = ("user", "group")
