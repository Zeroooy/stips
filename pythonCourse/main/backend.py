import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import User, Statement, Period


########################################
#                  ВСЕ
########################################

# Вход в систему
@csrf_exempt
def sign_in(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_login_password(data.get("login"), data.get("password"))
        if user is not None:
            response = {"answer": user.generate_session()}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Получить дату начала и конца сбора заявлений
@csrf_exempt
def get_period(request):
    try:
        date = Period.get_period()
        response = {
            "date_start": date[0],
            "date_end": date[1]
        }
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


########################################
#              СТУДЕНТ
########################################


# Отправка заявления на проверку
@csrf_exempt
def upload_statement(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_student():
            Statement.upload(user, data.get("json"))
            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Получение списка заявлений
@csrf_exempt
def get_my_statements(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_student():
            statements = user.get_statements()
            statements_info = []
            for s in statements:
                statements_info.append(s.get_data())

            response = {"answer": statements_info}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


########################################
#              ИНСПЕКТОР
########################################


# Просмотреть список заявлений
@csrf_exempt
def get_list_statements_inspector(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_inspector():

            response = {"statements": Statement.get_statements_by_statuses(["process", "error", "verified"])}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Просмотреть часть заявления
@csrf_exempt
def get_statement_inspector(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_inspector():
            statement_info = Statement.get_part_statement(user, data.get("statement-id"))

            response = {
                "statement": statement_info,
                "type": user.get_role()
            }
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)



# Просмотреть часть заявления
@csrf_exempt
def rate_statement_inspector(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_inspector():
            statement = Statement.get_statement(data.get("statement-id"))
            statement.mark(user, data.get("value"), data.get("comment"))
            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)




########################################
#                 ЖЮРИ
########################################


# Просмотреть список заявлений
@csrf_exempt
def get_list_statements_jury(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_inspector():

            response = {"statements": Statement.get_statements_by_statuses(["conflict", "confirm", "deny"])}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)



# Просмотреть заявление
@csrf_exempt
def get_statement_jury(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_inspector():
            statement_info = Statement.get_statement(data.get("statement-id"))

            response = {
                "statement": statement_info,
            }
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)



# Одобрить заявление
@csrf_exempt
def confirm_statement_jury(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_inspector():
            statement = Statement.get_by_id(data.get("statement-id"))
            statement.set_status_up()

            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Одобрить заявление
@csrf_exempt
def deny_statement_jury(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_inspector():
            statement = Statement.get_by_id(data.get("statement-id"))
            statement.set_status_down()

            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


########################################
#                АДМИН
########################################



# Просмотреть пользователя
@csrf_exempt
def get_user(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_inspector():
            user = User.get_by_id(data.get("user-id"))


            response = {
                "user": user.get_data_full(),
            }
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)



# Сменить роль
@csrf_exempt
def change_role_user(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_inspector():
            user = User.get_by_id(data.get("user-id"))
            user.change_role(data.get("user-role"))

            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)



# Просмотреть список пользователей
@csrf_exempt
def get_list_users(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_admin():

            response = {"users": User.get_users_info()}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Задать дату начала и конца сбора заявлений
@csrf_exempt
def set_period(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_admin():
            Period.set_start_and_end(data.get("date_start"), data.get("date_end"))
            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)





