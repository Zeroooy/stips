# ЭТО ОТСЛЕЖИВАТЕЛЬ ПЕРЕХОДОВ ПО ССЫЛКАМ ВНУТРИ МОДУЛЯ
# ТУТ МЫ УЖЕ КИДАЕМ НА VIEWS по адресам

from django.urls import path

from . import views

urlpatterns = [
    path('', views.login_page),
    path('adminpanel', views.admin_page),
    path('login', views.login_page),

    path('menu', views.menu_page),

    # мобильные штуки

    path('m.login', views.login_mobile_page),
    path('m.menu', views.menu_mobile_page),

    # Запросы к бэку

]