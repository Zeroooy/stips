# ЭТО ОТСЛЕЖИВАТЕЛЬ ПЕРЕХОДОВ ПО ССЫЛКАМ ВНУТРИ МОДУЛЯ
# ТУТ МЫ УЖЕ КИДАЕМ НА VIEWS по адресам

from django.urls import path

from . import views, backend

urlpatterns = [
    path('', views.login_page),
    path('adminpanel', views.admin_page),
    path('login', views.login_page),

    path('menu', views.menu_page),

    # мобильные штуки

    path('m.login', views.login_mobile_page),
    path('m.menu', views.menu_mobile_page),

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
    path('api/setOld', backend.set_old),
    path('api/getStatementsOld', backend.get_statements_old),

    # ЛОГИ
    path('api/getLog', backend.get_log),
    path('api/resetLog', backend.reset_log)

]