from activity.services.create_activity import create_activity
from django.db import transaction
from rest_framework import generics

from ..models import Expense
from ..serializers import ExpenseSerializer


class DeleteExpense(generics.DestroyAPIView):
    
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()
    @transaction.atomic
    def perform_destroy(self, instance):
        group=instance.group
        create_activity(group,self.request.user,
        "EXPENSE DELETE",f"You deleted the expense for group {group.group_name}")
        members=group.member.all()
        for i in members:
            if(i.user !=self.request.user):
                create_activity(group,self.request.user,
                        "EXPENSE DELETE",f" {self.request.user.username} deleted the expense of group {group.group_name}") 
        instance.delete()
                
        

