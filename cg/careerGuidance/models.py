from django.db import models

# Create your models here.

class Json(models.Model):
    name = models.CharField(max_length=30)
    json = models.FileField(upload_to='json/')
    results = models.FileField(upload_to='json/')
    def __str__(self):
        return self.name

class Setting(models.Model):
    name = models.CharField(max_length=30)
    active = models.BooleanField(default=False)
    firstTitle = models.TextField(default="Ищешь будущую профессию в IT?")
    firstDescription = models.TextField(default="поможет тебе в этом непростом выборе. Пройди небольшой тест и узнай какие направления <a class='mainLink' href='https://vk.com/fit.mospolytech'>FIT'a</a> подходят именно тебе!")
    lastTitle = models.TextField(default="Ты похож на политеховца ))")
    lastDescription = models.TextField(default="Тебе подойдут направления:")
    background = models.FileField(upload_to='img/')
    logo = models.FileField(upload_to='img/')    
    questions = models.ForeignKey(Json, on_delete=models.CASCADE)
    count = models.PositiveIntegerField(default=10)
    def __str__(self):
        return (self.name + " - "+ ("Активный" if self.active else "Неактивный"))

class Statistic(models.Model):
    referer = models.CharField(max_length=255)
    userAgent = models.CharField(max_length=255)
    time = models.DateTimeField(auto_now=True)
    results =  models.TextField()
    def __str__(self):
        return ( str(self.id) + " - " + str(self.time))
 
