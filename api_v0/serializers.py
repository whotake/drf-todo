from django.contrib.auth.models import User

from rest_framework import serializers

from tasks.models import Tasks


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class TasksSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tasks
        fields = ('user', 'text', 'is_completed')
