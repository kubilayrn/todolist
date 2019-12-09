from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext as _

# Create your models here.

class Item(models.Model):
    UNCOMPLETED = 0
    COMPLETED = 1
    STATUS = (
        (UNCOMPLETED, 'Uncompleted'),
        (COMPLETED, 'Completed'),
    )
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=300)
    deadline = models.DateTimeField()
    status = models.IntegerField(
        choices=STATUS,
        default=UNCOMPLETED,)
    
    def __str__(self):
        return self.name
    

class Todo(models.Model):
    owner = models.ForeignKey('auth.User',related_name='to_do_list', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    items = models.ManyToManyField(Item) 

    def __str__(self):
        return self.name


    