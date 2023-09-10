from django.contrib import admin
from .models import Opinion, User, Tag

# Register your models here.
admin.site.register(Opinion)
admin.site.register(User)
admin.site.register(Tag)