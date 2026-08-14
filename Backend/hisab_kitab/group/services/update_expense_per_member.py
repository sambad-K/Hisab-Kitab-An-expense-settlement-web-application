from decimal import ROUND_DOWN, Decimal

from expense.models import Expense, ExpensePerMember

from ..models import GroupMember


def update_expense_per_member(group_id):
    try:
        expense = Expense.objects.get(group_id=group_id)
        members = GroupMember.objects.filter(group_id=group_id)

        for member in members:
            expense_per_member = ExpensePerMember.objects.get_or_create(
                expense=expense,
                defaults={"share_amount": Decimal("0.00"), "paid_amount": Decimal("0.00")},  
                group_member=member,
            )
        if expense.split_type == "EQUAL" and len(members):
                count=len(members)
                base_share=(expense.amount/count).quantize(Decimal("0.01"),rounding=ROUND_DOWN)
                remainder=expense.amount-(base_share * count)
                for member in members:
                    expense_per_member=ExpensePerMember.objects.get(
                          expense=expense,
                          group_member=member
                     )
                    share=base_share
                    if remainder>Decimal("0.00"):
                        share+= Decimal("0.01")
                        remainder-= Decimal("0.01")
                    expense_per_member.share_amount = share
                    expense_per_member.save(update_fields=["share_amount"])
    except Expense.DoesNotExist:
        pass
