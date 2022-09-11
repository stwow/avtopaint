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
    img1 = models.FileField(upload_to='media/', blank=True)
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
    appraisals = (
        ('1', 'Плохо'),
        ('2', 'Неплохо'),
        ('3', 'Нормально'),
        ('4', 'Хорошо'),
        ('5', 'Отлично'),
    )

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



# class Reviews(models.Model): # отзывы
#     name_review = models.CharField(max_length=25, verbose_name="Имя")
#     review = models.TextField(verbose_name="Отзыв")
#     date_pub_review = models.DateTimeField(auto_now_add=True)
#     photo = models.ImageField(blank=True)
#     slug = models.SlugField(max_length=255,db_index=True, unique=True, verbose_name="URL" )
#
#
#
#     class Meta:
#         verbose_name = "Отзыв"
#         verbose_name_plural = "Отзывы"
#
#     def __str__(self):
#         return self.name_review
#
#     def get_absolute_url(self):
#         return reverse('show', args=[self.slug])
#
#
# class Service(models.Model): #услуги
#     name_service = models.CharField(max_length=100, verbose_name="название услуги")
#     description_service = models.TextField(verbose_name="описание")
#     photo_service = models.ImageField(upload_to= 'service',blank=True)
#     class Meta:
#         verbose_name = "Услуга"
#         verbose_name_plural = "Услуги"
#     def __str__(self):
#         return self.name_service
#
#
# class FormRequest(models.Model): # форма заявки
#     name_form_request = models.CharField(max_length=25)
#     transport_type = models.CharField(max_length=25) #сделать выборку списка
#     phone_form_request = models.BigIntegerField()
#     comment_form_request = models.TextField()
#     photo_form_reqeust = models.ImageField(blank=True)
#     date_pub_form_request = models.DateTimeField(auto_now_add=True)
#
#     class Meta:
#         verbose_name = "Форма заявки"
#         verbose_name_plural = "Формы заявок"
#
# class FormWrite(models.Model): # форма записи
#     name_form_write = models.CharField(max_length=25)
#     phone_form_write = models.IntegerField()
#     other_form_write = models.CharField(max_length=100)
#     time_form_write = models.DateTimeField(auto_now_add=True)
#
#     class Meta:
#         verbose_name = "Форма записи"
#         verbose_name_plural = "Формы записи"
#
# class RequestCall(models.Model): #заказать звонок
#     name_request_call = models.CharField(max_length=25)
#     phone_request_call = models.IntegerField()
#     time_request_call = models.DateTimeField(auto_now_add=True)
#
#     class Meta:
#         verbose_name = "Заказ звонка"
#         verbose_name_plural = "Заказ звонков"

