from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser, models.Model):
    following = models.ManyToManyField('self', blank=True, related_name="followers", symmetrical=False)

class Opinion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_posts")
    title = models.CharField(max_length=200)
    body = models.TextField()
    likes = models.ManyToManyField(User, blank=True, related_name="liked_opinions")
    date = models.DateTimeField(auto_now_add=True)