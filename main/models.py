from django.db import models



class Services(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    photo = models.ImageField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"

class Repair_Request_Photo(models.Model):
    name = models.CharField(max_length=25)
    phone = models.CharField(max_length=18)
    img1 = models.FileField(blank=True)
    date = models.DateField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Заявка с фото"
        verbose_name_plural = "Заявки с фото"


class Repair_Request(models.Model):
    name = models.CharField(max_length=25)
    phone = models.CharField(max_length=18)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"
#


class Reviews(models.Model):
    name = models.CharField(max_length=30)
    evaluation = models.CharField(max_length=25)
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"


class Photo(models.Model):
    photo1 = models.ImageField(blank=True)
    photo2 = models.ImageField(blank=True)

    class Meta:
        verbose_name = "Пример работы(фото)"
        verbose_name_plural = "Примеры работ(фото)"
