from django.views import View
from django.shortcuts import render

# Авторизация
class LoginPageView(View):
    def get(self, request):
        return render(request, 'login.html')
    url = 'login'



# Заявление
class StatementView(View):
    def get(self, request):
        return render(request, 'statment.html')
    url = 'statment'

# Заявления
class StatementsView(View):
    def get(self, request):
        return render(request, 'statments.html')
    url = 'statments'

# Меню
class MenuView(View):
    def get(self, request):
        return render(request, 'menu.html')
    url = 'menu'


# Пользователи
class UsersView(View):
    def get(self, request):
        return render(request, 'users.html',{'url': UsersView.url})
    url = 'users'

# Пользователь
class UserView(View):
    def get(self, request):
        return render(request, 'user.html')
    url = 'user'

# Даты
class DateView(View):
    def get(self, request):
        return render(request, 'date.html')
    url = 'date'

# Кеш
class CacheView(View):
    def get(self, request):
        return render(request, 'cache.html',{'url': CacheView.url})
    url = 'cache'

# История
class LogView(View):
    def get(self, request):
        return render(request, 'log.html',{'url': LogView.url})
    url = 'log'