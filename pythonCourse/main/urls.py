# ЭТО ОТСЛЕЖИВАТЕЛЬ ПЕРЕХОДОВ ПО ССЫЛКАМ ВНУТРИ МОДУЛЯ
# ТУТ МЫ УЖЕ КИДАЕМ НА VIEWS по адресам

from . import views, backend
from django.urls import path
from .views import (
    LoginPageView,
    StatementView,
    MenuView,
    StatementsView,
    UsersView,
    UserView,
    DateView,
    CacheView,
    LogView,
)
urlpatterns = [

    # авторизация
    path('',  LoginPageView.as_view(), name='login'),
    path(LoginPageView.url, LoginPageView.as_view(), name='login'),

    # Заявление
    path(StatementView.url, StatementView.as_view(), name='statment'),

    # Заявления
    path(StatementsView.url, StatementsView.as_view(), name='statments'),

    # Меню
    path(MenuView.url, MenuView.as_view(), name='menu'),


    # Пользователь
    path(UserView.url, UserView.as_view(), name='user'),

    # Пользователи
    path(UsersView.url, UsersView.as_view(), name='users'),

    # Даты
    path(DateView.url, DateView.as_view(), name='date'),

    # Кеш
    path(CacheView.url, CacheView.as_view(), name='cache'),

    # История
    path(LogView.url, LogView.as_view(), name='log'),



    # Запросы к бэку

    # ВСЕ
    path('api/signIn', backend.sign_in),
    path('api/getPeriod', backend.get_period),
    path('api/getRole', backend.get_role),
    path('api/getStatement', backend.get_statement),
    path('api/getStatements', backend.get_statements),

    # СТУДЕНТ
    path('api/uploadStatement', backend.upload_statement),



    # ИНСПЕКТОР
    path('api/rateStatement', backend.rate_statement_inspector),
    path('api/autoPoints', backend.auto_points),


    # ЖЮРИ

    path('api/confirmStatement', backend.confirm_statement_jury),
    path('api/denyStatement', backend.deny_statement_jury),

    path('api/getWordSuccess', backend.get_word_success),
    path('api/getWordAll', backend.get_word_all),

    # АДМИН
    path('api/setPeriod', backend.set_period),

    path('api/getListUsers', backend.get_list_users),
    path('api/getUser', backend.get_user),

    path('api/changeRole', backend.change_role_user),
    path('api/changeStatus', backend.change_status),

    path('api/changeRole', backend.change_role_user),

    # КЕШ В АДМИНКЕ
    path('api/setOld', backend.set_old),
    path('api/getStatementsOld', backend.get_statements_old),

    # ЛОГИ
    path('api/getLog', backend.get_log),
    path('api/resetLog', backend.reset_log)

]