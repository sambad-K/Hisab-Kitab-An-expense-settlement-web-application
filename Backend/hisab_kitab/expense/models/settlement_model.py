from django.db import models
from group.models import GroupMember

from ..models import Expense


class Settlement(models.Model):
    from_member = models.ForeignKey(
        GroupMember, on_delete=models.CASCADE, related_name="payment_sent"
    )
    to_member = models.ForeignKey(
        GroupMember, on_delete=models.CASCADE, related_name="payment_received"
    )
    expense = models.ForeignKey(
        Expense, on_delete=models.CASCADE, related_name="settlement"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.BooleanField(default=False)
    first_payment = models.DateTimeField(auto_now_add=True)
    latest_payment = models.DateTimeField(auto_now=True)
