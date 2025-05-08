from django.db import models
from accounts.models import User

class Diary(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField(max_length=500)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    main_emotion = models.CharField(max_length=20, null=True, blank=True)
    sub_emotion = models.CharField(max_length=50, null=True, blank=True)