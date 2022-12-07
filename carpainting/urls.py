
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from main.views import main, set_repair_request_photo, set_review

urlpatterns = [
    path('', main, name='main'),
    path('repair_request/', set_repair_request_photo, name='set_repair_request_photo'),
    path('review/', set_review, name='set_review'),
    path('admin/', admin.site.urls),
    path('captcha/', include('captcha.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

