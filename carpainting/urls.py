
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from main.views import index, index1, indexes

urlpatterns = [
    path('', index, name = 'index'),
    path('form/', index1, name = 'index1'),
    path('form1/', indexes, name = 'indexes'),
    path('admin/', admin.site.urls),
    path('captcha/', include('captcha.urls')),
    # path('review/<slug>/', show_review, name = 'show'),

]

if settings.DEBUG: #если нашь проект находится в режиме дебага, мы будем использ. локальный медиа контент
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

