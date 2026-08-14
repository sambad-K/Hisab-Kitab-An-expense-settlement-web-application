import heapq

from django.db import transaction


@transaction.atomic  # i did this, this done to make sure the settlement either fails and backtrack or success 100% 
def make_settlement(expense):
    members = expense.perexpense.all()

    receiver_participant = []
    payer_participant = []
    settlements = []

    for i in members:
        balance = i.paid_amount - i.share_amount
        if balance > 0:
            heapq.heappush(receiver_participant, (-balance, i.id, i))
        elif balance < 0:
            heapq.heappush(payer_participant, (balance, i.id, i))
    while receiver_participant and payer_participant:
        receiver_amount, _, receiver = heapq.heappop(receiver_participant)
        payer_amount, _, payer = heapq.heappop(payer_participant)
        receiver_amount = -receiver_amount

        amount = min(receiver_amount, abs(payer_amount))
        receiver_amount -= amount
        payer_amount += amount

        settlements.append(
            {
                "from_member": payer,
                "to_member": receiver,
                "amount": amount,
            }
        )
        if receiver_amount > 0:
            heapq.heappush(
                receiver_participant, (-receiver_amount, receiver.id, receiver)
            )
        if payer_amount < 0:
            heapq.heappush(payer_participant, (payer_amount, payer.id, payer))

    return settlements
