# ЭТО ОТСЛЕЖИВАТЕЛЬ ПЕРЕХОДОВ ПО ССЫЛКАМ ВНУТРИ ПРОЕКТА



from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include('main.urls')), # '' - значит мейн типа без доп ссылок, переходим на отслеживатель переходов в приложение main
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
