from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Tasks
from .serializers import TasksSerializer


# @api_view(['GET'])
@permission_classes((IsAuthenticated,))
class TasksViewSet(viewsets.ModelViewSet):
    serializer_class = TasksSerializer

    def get_queryset(self):
        return Tasks.objects.filter(is_completed=False)
