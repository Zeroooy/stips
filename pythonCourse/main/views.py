from django.views import View
from django.shortcuts import render

# Авторизация
class LoginPageView(View):
    def get(self, request):
        return render(request, 'login/index.html',{'url': StudentMainView.url,'url2': InspectorMainView.url,'url3': JuryMainView.url,'url4': AdminPanelView.url})
    url = 'login'

# Студент
class StudentStatementView(View):
    def get(self, request):
        return render(request, 'student/student_statment.html')

    url = 'studentstatment'

class StudentMenuView(View):
    def get(self, request):
        return render(request, 'student/student_menu.html',{'url': StudentStatementView.url})

    url = 'studentmenu'

class StudentMainView(View):
    def get(self, request):
        return render(request, 'student/student_main.html',{'url': StudentMenuView.url,'url2': StudentStatementView.url})

    url = 'studentmain'
# Инспектор
class InspectorStatementView(View):
    def get(self, request):
        return render(request, 'inspector/inspector_statment.html')
    url = 'inspectorstatment'

class InspectorMenuView(View):
    def get(self, request):
        return render(request, 'inspector/inspector_menu.html',{'url': InspectorStatementView.url})

    url = 'inspectormenu'
class InspectorMainView(View):
    def get(self, request):
        return render(request, 'inspector/inspector_main.html',{'url': InspectorMenuView.url})

    url = 'inspectormain'
# Жюри
class JuryStatementView(View):
    def get(self, request):
        return render(request, 'jury/jury_statment.html')

    url = 'jurystatment'

class JuryMenuView(View):
    def get(self, request):
        return render(request, 'jury/jury_menu.html',{'url': JuryStatementView.url})

    url = 'jurymenu'
class JuryMainView(View):
    def get(self, request):
        return render(request, 'jury/jury_main.html',{'url': JuryMenuView.url})

    url = 'jurymain'
# Админпанель
class AdminPanelUsersView(View):
    def get(self, request):
        return render(request, 'adminpanel/adminpanel_users.html',{'url': AdminPanelUserView.url})

    url = 'adminpanelusers'
class AdminPanelUserView(View):
    def get(self, request):
        return render(request, 'adminpanel/adminpanel_user.html')

    url = 'adminpaneluser'
class AdminPanelManageView(View):
    def get(self, request):
        return render(request, 'adminpanel/adminpanel_data.html')

    url = 'adminpaneldata'
class AdminPanelStatementsView(View):
    def get(self, request):
        return render(request, 'adminpanel/adminpanel_statments.html')

    url = 'adminpanelstatments'
class AdminPanelCacheView(View):
    def get(self, request):
        return render(request, 'adminpanel/adminpanel_cache.html',{'url': AdminPanelCacheView.url})

    url = 'adminpanelcache'
class AdminPanelView(View):
    def get(self, request):
        return render(request, 'adminpanel/adminpanel.html',{'url': AdminPanelCacheView.url,'url2': AdminPanelStatementsView.url,'url3': AdminPanelManageView.url,'url4': AdminPanelUsersView.url,'url5': AdminPanelUsersView.url,'url6': AdminPanelLogView.url})

    url = 'adminpanel'

class AdminPanelLogView(View):
    def get(self, request):
        return render(request, 'adminpanel/adminpanel_log.html',{'url': AdminPanelLogView.url})
    url = 'adminpanellog'