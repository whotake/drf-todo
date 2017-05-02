from rest_framework import viewsets

from .models import Tasks
from .serializers import TasksSerializer


class TasksViewSet(viewsets.ModelViewSet):

    serializer_class = TasksSerializer

    def get_queryset(self):
        return Tasks.objects.filter(is_completed=False)
