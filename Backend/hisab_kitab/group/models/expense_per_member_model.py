from django.db import models

from .group_member_model import GroupMember


class ExpensePerMember:
    group_member = models.OneToOneField(
        GroupMember, on_delete=models.CASCADE, related_name="expense_per"
    )
    share_amount = models.IntegerField()
    percentage = models.IntegerField()
    owes_amount = models.IntegerField()
    payment_date = models.DateTimeField(auto_now_add=True)
