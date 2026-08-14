from activity.services.create_activity import create_activity
from rest_framework import generics

from group.models import Group

from ..models import GroupMember
from ..serializers import GroupMemberSerializer
from ..services.update_expense_per_member import update_expense_per_member


class AddGroupMember(
    generics.CreateAPIView
):  # means, i am doing this to add a user to the group
    queryset = GroupMember.objects.all()
    serializer_class = GroupMemberSerializer

    def perform_create(self, serializer):
        group_id = self.kwargs["pk"]
        user_id = self.kwargs["id"]
        member = serializer.save(group_id=group_id, user_id=user_id)
        create_activity(
            (Group.objects.get(id=group_id)),
            self.request.user,
            "MEMBER ADD",
            f""" You added {member.user.username}
              to group {Group.objects.get(id=group_id).group_name}""",  
        )
        create_activity(
            (Group.objects.get(id=group_id)),
            member.user
            ,
            "MEMBER ADD",
            f"""You were  added to group {Group.objects.get(id=group_id).group_name} 
            by {self.request.user.username}""",
        )
        update_expense_per_member(group_id=group_id)
