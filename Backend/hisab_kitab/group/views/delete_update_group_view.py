from activity.services.create_activity import create_activity
from django.db.transaction import atomic
from expense.models import Expense
from rest_framework import generics, status
from rest_framework.response import Response

from ..models import Group
from ..serializers import GroupSerializer


class DeleteUpdateGroup(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=self.request.data, partal=True)
        if (instance.member.filter(user=self.request.user)).exists():
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        return Response(
            {"error": "Update not allowed"}, status=status.HTTP_403_FORBIDDEN
        )

    @atomic
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            expense = Expense.objects.get(group=instance)
            settlements = expense.settlement.all()
            for settlement in settlements:
                if not settlement.status:
                    return Response(
                        {"error": "The settlements are not cleared"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
        except Expense.DoesNotExist:
            pass
        members = instance.member.all()
        create_activity(
                        instance,
                        self.request.user,
                        "GROUP DELETE",
                        f"""You deleted the group {instance.group_name}. """,
                    )
        for i in members.exclude(user=self.request.user):
            create_activity(
                instance,
                i.user,
                "GROUP DELETE",
                f"""The group {instance.group_name} was deleted by admin """,
            )

        self.perform_destroy(instance)
        return Response(status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if (instance.member.filter(user=self.request.user)).exists():
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
