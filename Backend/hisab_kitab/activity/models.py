# Create your models here.
from django.contrib.auth import get_user_model
from django.db import models
from group.models import Group

User=get_user_model()


ACTIVITY_TYPES=(
    (" GROUP CREATE","Group Creation"),
    ("MEMBER ADD","Member Add"),
    ("MEMBER REMOVE","Member remove"),
    ("EXPENSE CREATE","Expense Create"),
    ("EXPENSE UPDATE","Expense Update"),
    ("EXPENSE DELETE","Expense Delete"),
    ("PAYMENT","Payment"),
    ("SETTLEMENT CREATE","Settlement Create"),
    ("GROUP DELETE","Group deleted")
)
class Activity(models.Model):
    group=models.ForeignKey(Group,on_delete=models.SET_NULL,related_name="group_activities",null=True,blank=True)
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True,related_name="user_activities")
    type=models.CharField(max_length=50,choices=ACTIVITY_TYPES)
    title=models.CharField(max_length=200)
    created_at=models.DateTimeField(auto_now_add=True)
