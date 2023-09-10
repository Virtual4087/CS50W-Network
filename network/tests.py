from django.test import TestCase
from .models import Tag, Opinion

# Create your tests here.

class Unittest(TestCase):
    def setUp(self):
        Tag.create()