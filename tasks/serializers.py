from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Tasks


class TasksSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tasks
        fields = ('user', 'text', 'is_completed')
