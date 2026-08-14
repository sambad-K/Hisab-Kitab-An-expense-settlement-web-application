from activity.models import Activity
from django.db.models import Q, Sum
from expense.models import Expense, ExpensePerMember, Settlement
from group.models import Group, GroupMember
from rest_framework import generics
from rest_framework.response import Response


class DashBoard(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        user = request.user

        total_groups = GroupMember.objects.filter(user=user).count()

        total_expense = (
            Expense.objects.filter(group__member__user=user)
            .distinct()
            .aggregate(total=Sum("amount"))["total"]
            or 0
        )
        food_category = Expense.objects.filter(
            group__member__user=user, category="Food"
        ).distinct().count()
        entertainment_category = Expense.objects.filter(
            group__member__user=user, category="Entertainment"
        ).distinct().count()
        travel_category = Expense.objects.filter(
            group__member__user=user, category="Travel"
        ).distinct().count()
        gaming_category = Expense.objects.filter(
            group__member__user=user, category="Gaming"
        ).distinct().count()
        other_category = (
            Expense.objects.filter(group__member__user=user)
            .exclude(
                Q(category="Food")
                | Q(category="Gaming")
                | Q(category="Travel")
                | Q(category="Entertainment")
            ).distinct()
            .count()
        )

        total_paid = (
            ExpensePerMember.objects.filter(group_member__user=user).aggregate(
                total=Sum("paid_amount")
            )["total"]
            or 0
        )

        total_share = (
            ExpensePerMember.objects.filter(group_member__user=user).aggregate(
                total=Sum("share_amount")
            )["total"]
            or 0
        )

        balance = total_paid - total_share

        pending_to_receive = (
            Settlement.objects.filter(to_member__user=user, status=False).aggregate(
                total=Sum("amount")
            )["total"]
            or 0
        )
        pending_settlement_count = Settlement.objects.filter(
            Q(to_member__user=user) | Q(from_member__user=user), Q(status=False)
        ).distinct().count()
        completed_settlement_count = Settlement.objects.filter(
            Q(to_member__user=user) | Q(from_member__user=user), Q(status=True)
        ).distinct().count()
        group = Group.objects.filter(member__user=request.user).order_by("-created_at")[
            :5
        ]
        activities=Activity.objects.filter(user=self.request.user).order_by("-created_at")[:5]
        activity_data=[]
        for i in activities:
            activity_data.append(i.title)

        group_data = []
        for i in group:
            group_data.append(
                {
                    "id": i.id,
                    "group_name": i.group_name,
                    "description": i.description,
                    "created_at": i.created_at,
                }
            )

        data = {
            "user": user.first_name,
            "summary": {
                "total_groups": total_groups,
                "total_expense": total_expense,
                "total_paid": total_paid,
                "your_owe": -balance if balance < 0 else 0,
                "your_receive": max(balance, 0),
                "pending_settlements": pending_to_receive,
            },
            "category": {
                "food": food_category,
                "entertainment": entertainment_category,
                "travel": travel_category,
                "gaming": gaming_category,
                "others": other_category,
            },
            "pending_settlement_counts": pending_settlement_count,
            "completed_settlement_counts": completed_settlement_count,
            "group": group_data,
            "activity":activity_data
        }
        return Response(data)
