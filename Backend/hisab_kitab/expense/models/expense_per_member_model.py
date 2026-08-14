from django.db import models
from group.models import GroupMember

from .expense_model import Expense


class ExpensePerMember(models.Model):
    expense = models.ForeignKey(
        Expense, on_delete=models.CASCADE, related_name="perexpense"
    )
    group_member = models.OneToOneField(GroupMember, on_delete=models.CASCADE)
    paid_amount = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    share_amount = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
