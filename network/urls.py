
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("users/<str:name>", views.profile, name="profile"),
    path("following", views.index, name="following"),
    path("<int:id>/edit", views.edit, name="edit")
]
