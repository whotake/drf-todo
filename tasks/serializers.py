from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Tasks


class TasksSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Tasks
        fields = ('user', 'text', 'is_completed', 'id')
        extra_kwargs = {'user': {'write_only': True}}
