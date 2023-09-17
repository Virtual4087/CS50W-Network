from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser, models.Model):
    following = models.ManyToManyField('self', blank=True, related_name="followers", symmetrical=False)

class Tag(models.Model):
    tag = models.CharField(max_length=32, unique=True, blank=False)

class Opinion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_posts")
    title = models.CharField(max_length=200)
    body = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True, related_name="opinion_tags")
    likes = models.ManyToManyField(User, blank=True, related_name="liked_opinions")
    date = models.DateTimeField(default= timezone.now())