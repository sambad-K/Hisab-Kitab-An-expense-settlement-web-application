from activity.services.create_activity import create_activity
from django.db.models import Q
from expense.models import Settlement
from rest_framework import generics
from rest_framework.exceptions import ValidationError

from ..models import Group, GroupMember
from ..serializers import GroupMemberSerializer
from ..services.update_expense_per_member import update_expense_per_member


class DeleteGroupMember(generics.DestroyAPIView):
    serializer_class = GroupMemberSerializer
    queryset = GroupMember.objects.all()

    def perform_destroy(self, instance):
        if (
            Settlement.objects.filter(
                expense__group=instance.group, status=False
            ).filter(Q(from_member=instance) | Q(to_member=instance))
        ).exists():
            raise ValidationError({"error": "The member still has settlements left"})
        group_id = instance.group.id
        group=Group.objects.get(id=group_id)

        if(self.request.user==instance.user ):
                if (instance.role=="ADMIN"):
                    create_activity(group,instance.user,"MEMBER REMOVE",
                                        f"""You, as an admin left group {group.group_name}  so group is deleted""")
                    for i in group.member.exclude(user=self.request.user):
                        create_activity(group, i.user,"MEMBER REMOVE",
                                        f"""{instance.user.username}, as an admin left group {group.group_name}  so group is deleted""")
                else:
                    create_activity(group,instance.user,"MEMBER REMOVE",
                    f"""You left group {group.group_name} """)
                     
        else:
            create_activity(group,self.request.user,"MEMBER REMOVE",
                        f"""You, as an admin removed {instance.user.username} from group
                          {group.group_name} """)
            create_activity(group,instance.user,"MEMBER REMOVE",
                                    f"""You were removed by admin {self.request.user.username} 
                                    from group {group.group_name} """)
                                     
        instance.delete()
        update_expense_per_member(group_id)
