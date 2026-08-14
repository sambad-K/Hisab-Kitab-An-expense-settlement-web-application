from ..models import Activity


def create_activity(group,user,activity_type,title):
    Activity.objects.create(group=group,user=user,type=activity_type,title=title)
