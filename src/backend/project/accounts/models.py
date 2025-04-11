from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager) : 

    def create_user(self, username, password=None):
        user = self.model(username = username)
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    username = models.CharField(max_length=150, unique=True)
    objects = UserManager()
    USERNAME_FIELD = 'username'
    def __str__(self):
        return self.username