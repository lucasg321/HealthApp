from django.db import models

class Food(models.Model):
    name = models.CharField("Name", max_length=240)
    calories = models.IntegerField()
    registrationDate = models.DateField("Registration Date", auto_now_add=True)

    def __str__(self):
        return self.name
