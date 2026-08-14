from django.db import models
from group.models import Group

choices = (("EQUAL", "Equal"), ("EXACT", "Exact"), ("PERCENT", "Percent"))


class Expense(models.Model):
    group = models.OneToOneField(
        Group, on_delete=models.CASCADE, related_name="expense"
    )
    category = models.CharField(default="Misc", max_length=20)
    split_type = models.CharField(max_length=20, choices=choices, default="EQUAL")
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
