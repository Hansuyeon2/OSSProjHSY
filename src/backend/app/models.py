from django.db import models
from accounts.models import User
from django.utils import timezone
class Diary(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField(max_length=500)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    main_emotion = models.CharField(max_length=20, null=True, blank=True)
    sub_emotion = models.JSONField(default=list, blank=True)
    analysis = models.JSONField(null=True, blank=True)  

class NightDiary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField() 
    main_emotion = models.CharField(max_length=20)
    sub_emotion = models.JSONField(default=list, blank=True)  
    analysis = models.JSONField()             
    comment = models.TextField(null=True, blank=True)


class Book(models.Model):
    title = models.CharField(max_length=255)
    auth = models.CharField()
    main_emotion = models.CharField(max_length=50)
    sub_emotion = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.title

class Movie(models.Model):
    title = models.CharField(max_length=255)
    director = models.CharField(max_length=255, null=True, blank=True)
    main_emotion = models.CharField(max_length=20, null=True, blank=True)
    sub_emotion = models.JSONField(null=True, blank=True)


    def __str__(self):
        return self.title


class Exhibition(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255, null=True, blank=True)
    genre = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.title

class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    year = models.IntegerField()
    month = models.IntegerField()
    main_emotion = models.JSONField(default=dict)     
    sub_emotion = models.JSONField(default=dict)     
    weekly_emotion = models.JSONField(default=dict)  
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'year', 'month')
