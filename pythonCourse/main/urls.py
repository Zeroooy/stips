# ЭТО ОТСЛЕЖИВАТЕЛЬ ПЕРЕХОДОВ ПО ССЫЛКАМ ВНУТРИ МОДУЛЯ
# ТУТ МЫ УЖЕ КИДАЕМ НА VIEWS по адресам

from . import views, backend
from django.urls import path
from .views import (
    LoginPageView,
    StudentStatementView,
    StudentMenuView,
    StudentMainView,
    InspectorStatementView,
    InspectorMenuView,
    InspectorMainView,
    JuryStatementView,
    JuryMenuView,
    JuryMainView,
    AdminPanelUsersView,
    AdminPanelUserView,
    AdminPanelManageView,
    AdminPanelStatementsView,
    AdminPanelCacheView,
    AdminPanelView,
    AdminPanelLogView,
)
urlpatterns = [

    # авторизация
    path('',  LoginPageView.as_view(), name='login'),
    path(LoginPageView.url, LoginPageView.as_view(), name='login'),

    # Студент
    path(StudentStatementView.url, StudentStatementView.as_view(), name='student_statment'),
    path(StudentMenuView.url, StudentMenuView.as_view(), name='student_menu'),
    path(StudentMainView.url, StudentMainView.as_view(), name='student_main'),

    # Инспектор
    path(InspectorStatementView.url, InspectorStatementView.as_view(), name='inspector_statment'),
    path(InspectorMenuView.url, InspectorMenuView.as_view(), name='inspector_menu'),
    path(InspectorMainView.url, InspectorMainView.as_view(), name='inspector_main'),

    # Жюри
    path(JuryStatementView.url, JuryStatementView.as_view(), name='jury_statment'),
    path(JuryMenuView.url, JuryMenuView.as_view(), name='jury_menu'),
    path(JuryMainView.url, JuryMainView.as_view(), name='jury_main'),

    # Админпанель
    path(AdminPanelUsersView.url, AdminPanelUsersView.as_view(), name='adminpanel_users'),
    path(AdminPanelUserView.url, AdminPanelUserView.as_view(), name='adminpanel_user'),
    path(AdminPanelManageView.url, AdminPanelManageView.as_view(), name='adminpanel_data'),
    path(AdminPanelStatementsView.url, AdminPanelStatementsView.as_view(), name='adminpanel_statments'),
    path(AdminPanelCacheView.url, AdminPanelCacheView.as_view(), name='adminpanel_cache'),
    path(AdminPanelView.url, AdminPanelView.as_view(), name='adminpanel'),
    path(AdminPanelLogView.url, AdminPanelLogView.as_view(), name='adminpanel_log'),

    # Запросы к бэку

    # ВСЕ
    path('api/signIn', backend.sign_in),
    path('api/getPeriod', backend.get_period),
    path('api/getRole', backend.get_role),

    # СТУДЕНТ
    path('api/uploadStatement', backend.upload_statement),
    path('api/getMyStatements', backend.get_my_statements),
    path('api/getMyStatement', backend.get_my_statement),



    # ИНСПЕКТОР
    path('api/getListStatementsInspector', backend.get_list_statements_inspector),
    path('api/getStatementInspector', backend.get_statement_inspector),
    path('api/rateStatement', backend.rate_statement_inspector),


    # ЖЮРИ
    path('api/getListStatementsJury', backend.get_list_statements_jury),
    path('api/getStatementJury', backend.get_statement_jury),

    path('api/confirmStatement', backend.confirm_statement_jury),
    path('api/denyStatement', backend.deny_statement_jury),


    # АДМИН
    path('api/setPeriod', backend.set_period),

    path('api/getListUsers', backend.get_list_users),
    path('api/getUser', backend.get_user),

    path('api/changeRole', backend.change_role_user),

    path('api/getStatement', backend.get_statement_admin),
    path('api/getListStatements', backend.get_list_statements_admin),
    path('api/changeRole', backend.change_role_user),

    # КЕШ В АДМИНКЕ
    path('api/cache', backend.cache),
    path('api/getListCache', backend.get_list_cache),

    # ЛОГИ
    path('api/getLog', backend.get_log),
    path('api/resetLog', backend.reset_log)

]