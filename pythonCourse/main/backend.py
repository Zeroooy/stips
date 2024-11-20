import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from pythonCourse.main.models import User, Statement


# Вход в систему
@csrf_exempt
def sign_in(request):
    data = json.loads(request.body)
    user = User.get_user_by_login_password(data.get("login"),data.get("pasword"))
    if user is not None:
        response = {"answer":user.generate_session_id()}
    else:
        response = {"answer":False}

    return JsonResponse(response)




# Отправка заявления на проверку
@csrf_exempt
def upload_statement(request):
    data = json.loads(request.body)
    user = User(User.get_user_by_session(data.get("session")))
    if user is not None and user.is_student():
        Statement.add(user.get)
        response = {"answer":True}
    else:
        response = {"answer":False}

    return JsonResponse(response)
