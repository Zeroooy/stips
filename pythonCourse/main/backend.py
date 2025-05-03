import json
import copy
#from multiprocessing.managers import State

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.views.decorators.http import require_POST
from django.core.files.storage import FileSystemStorage

from .models import User, Statement, Period, Log




# Папка для сохранения файлов
BASE_URL = 'http://127.0.0.1:8000/files/'  # Базовый URL для файлов

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


# Получить роль
@csrf_exempt
def get_role(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        response = {
            "answer": user.get_role()
        }
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Просмотреть заявление
@csrf_exempt
def get_statement(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_student():
            statement = Statement.get_by_id(data.get("statement-id"))

            response = {"statement-data": statement.get_data(),
                        "statement-json": statement.get_json_data()
                        }
        elif user is not None:
            statement = Statement.get_by_id(data.get("statement-id"))

            response = {"statement-data": statement.get_data(),
                        "statement-json": statement.get_json_data()
                        }
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


@csrf_exempt
def get_statements(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_student():
            statements = user.get_statements()
            statements_info = []
            for s in statements:
                statements_info.append(s.get_data())
            response = {"statements": statements_info}

        elif user is not None and user.is_inspector():
            response = {"statements": Statement.get_statements_by_statuses(["process", "error", "verified"])}
        elif user is not None and user.is_jury():
            response = {"statements": Statement.get_statements_by_statuses(["conflict", "confirm", "deny"])}
        elif user is not None and user.is_admin():
            response = {"statements": Statement.get_statements_by_statuses(["process", "error", "verified", "deny", "confirm", "conflict"])}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


########################################
#              СТУДЕНТ
########################################


# Отправка заявления на проверку
# @csrf_protect
@csrf_exempt
@require_POST
def upload_statement(request):
    try:
        data = request.POST
        json_data_ = data.get("json")
        json_data = json.loads(json_data_)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_student() and json_data.get("studies") is not None and json_data.get("science") is not None and json_data.get("activities") is not None and json_data.get("culture") is not None and json_data.get("sport") is not None and (json_data.get("studies") != {} or json_data.get("science") != {} or json_data.get("activities") != {} or json_data.get("culture") != {} or json_data.get("sport") != {}):
            if Statement.upload(user, json_data, request.FILES):
                Log.add(user, "Загрузка заявления", "", copy.deepcopy(Statement.get_by_user(user).get_json_data()))
                response = {"answer": True}
            else:
                response = {"answer": "Too late"}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    #    except Exception as e:
    #    return HttpResponse(str(e))

    return JsonResponse(response)



########################################
#              ИНСПЕКТОР
########################################



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
            statement = Statement.get_by_id(data.get("statement-id"))
            statement.mark(user, data.get("mark"), data.get("comment"))
            Log.add(user, "Оценка заявления", "Оценка:" + str(data.get("mark")) + "\nКомментарий:" + data.get("comment"), copy.deepcopy(statement.get_json_data()))
            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)




########################################
#                 ЖЮРИ
########################################




# Просмотреть заявление
@csrf_exempt
def get_statement_jury(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_jury():
            statement = Statement.get_by_id(data.get("statement-id"))

            response = {"statement-data": statement.get_data(),
                        "statement-json": statement.get_json_data()
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
        if user is not None and user.is_jury():
            statement = Statement.get_by_id(data.get("statement-id"))
            statement.set_status_up()
            Log.add(user, "Одобрение заявления", "", copy.deepcopy(statement.get_json_data()))
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
        if user is not None and user.is_jury():
            statement = Statement.get_by_id(data.get("statement-id"))
            statement.set_status_down()
            Log.add(user, "Отклонение заявления", "", copy.deepcopy(statement.get_json_data()))
            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Выгрузить список человек получивших стипендию
@csrf_exempt
def get_word_success(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and (user.is_jury() or user.is_admin()):
            temp = []
            for s in Statement.objects.filter(status__name="confirm", old_status=False):
                temp.append(s.user)
            Log.add(user, "Выгрузка списка человек получивших стипендию", "Выполнил: "+str(user), {})
            response = {"answer": create_word_with_sucess(temp)}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Выгрузить список человек подавших заявления
@csrf_exempt
def get_word_all(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and (user.is_jury() or user.is_admin()):
            temp = []
            for s in Statement.objects.filter(old_status=False):
                temp.append(s.user)
            Log.add(user, "Выгрузка списка человек получивших стипендию", "Выполнил: "+str(user), {})
            response = {"answer": create_word_with_sucess(temp)}
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
        if user is not None and user.is_admin():
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
        if user is not None and user.is_admin():
            user_ = User.get_by_id(data.get("user-id"))
            user_.change_role(data.get("user-role"))
            Log.add(user, "Изменение роли", data.get("user-id") + " изменен на " + str(data.get("user-role")), {})
            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)

# Сменить статус заявления
@csrf_exempt
def change_status(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_admin():
            statement = Statement.get_by_id(data.get("statment-id"))
            statement.change_status("status")
            Log.add(user, "Изменение статуса заявления", "У заявления " + str(data.get("statment-id")) + " статус изменен на " + str(data.get("status")), {})
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
            Log.add(user, "Изменение даты сборов", data.get("date_start") + " --- " + data.get("date_end"), {})
            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Закешировать все
@csrf_exempt
def set_old(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_admin():
            Statement.set_old()
            Log.add(user, "Перевод заявлений в статус устаревших", "", {})
            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Просмотреть кешированные
@csrf_exempt
def get_statements_old(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_admin():
            response = {"statements": Statement.get_statements_old()}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)




# Просмотреть логи
@csrf_exempt
def get_log(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_admin():
            response = {"logs": Log.get_list()}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)



# Очистить логи
@csrf_exempt
def reset_log(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_admin():
            Log.reset()
            Log.add(user, "Очистка кеша", "", {})
            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)




from docx import Document
from docx.shared import Pt
from datetime import datetime

# Функция файла docx

def create_word_with_list(items, title):
    doc = Document()
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"{title}_{timestamp}.docx"
    i = 1
    for item in items:
        para = doc.add_paragraph(str(i) + ". " + str(item))
        run = para.runs[0]
        run.font.name = "Times New Roman"
        run.font.size = Pt(14)
        i+=1
    doc.save("files/" + filename)
    return filename

def create_word_with_sucess(items):
    return create_word_with_list("Отчет_со_списком_получивших_стипендию", items)


def create_word_with_all(items):
    return create_word_with_list("Отчет_со_списком_подавших_заявления", items)











