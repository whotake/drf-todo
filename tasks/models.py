from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Tasks(models.Model):
    user = models.ForeignKey(User)
    text = models.CharField(max_length=200)
    is_completed = models.BooleanField(default=False)
    time_added = models.DateTimeField(default=timezone.now())

    def __str__(self):
        return self.user.username + ': ' + self.text[:20]
