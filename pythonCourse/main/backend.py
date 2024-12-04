import json
import copy
import re
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
        json_data = json.loads(data.get("json"))
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_student() and json_data.get("studies") is not None and json_data.get("science") is not None and json_data.get("activities") is not None and json_data.get("culture") is not None and json_data.get("sport") is not None and (json_data.get("studies") != {} or json_data.get("science") != {} or json_data.get("activities") != {} or json_data.get("culture") != {} or json_data.get("sport") != {}):
            json_change = replace_at_values_with_links(json_data, request.FILES)
            if Statement.upload(user, json_change):
                Log.add(user, "Загрузка заявления", "", copy.deepcopy(Statement.get_by_user(user).get_json_data()))
                response = {"answer": True}
            else:
                response = {"answer": "Too late"}
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



# Получение списка заявлений
@csrf_exempt
def get_my_statement(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_student():
            statement = Statement.get_by_user(user)


            response = {"statement-data": statement.get_data(),
                        "statement-json": statement.get_json_data()
                        }
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


# Просмотреть список заявлений
@csrf_exempt
def get_list_statements_jury(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_jury():

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


########################################
#                АДМИН
########################################


# Получение заявления
@csrf_exempt
def get_statement_admin(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_admin():

            statement = Statement.get_by_id(data.get("statement-id"))

            response = {"statement-data": statement.get_data(),
                        "statement-json": statement.get_json_data()
                        }
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Получение заявлений
@csrf_exempt
def get_list_statements_admin(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_admin():
            response = {"statements": Statement.get_statements_by_statuses(["process", "error", "verified", "deny", "confirm", "conflict"])}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


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
def cache(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_admin():
            Statement.cache()
            Log.add(user, "Кеширование заявлений", "", {})
            response = {"answer": True}
        else:
            response = {"answer": False}
    except:
        return HttpResponse("bad request")

    return JsonResponse(response)


# Просмотреть кешированные
@csrf_exempt
def get_list_cache(request):
    try:
        data = json.loads(request.body)
        user = User.get_by_session(data.get("session"))
        if user is not None and user.is_admin():
            response = {"statements": Statement.get_statements_cache()}
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



















# Функция для сохранения файла и генерации ссылки
def save_file_and_generate_link(uploaded_file):

    # Возвращаем ссылку на сохранённый файл
    fs = FileSystemStorage(location="files")

    # Сохраняем файл на сервере
    filename = fs.save(uploaded_file.name, uploaded_file)

    # Получаем путь к сохраненному файлу
    return fs.url(filename)


# Функция для замены значений "@n" на ссылки
def replace_at_values_with_links(data, files):
    a = 1
    def replace_values(item, files_):
        if isinstance(item, dict):
            for key, value in item.items():
                item[key] = replace_values(value, files_)
        elif isinstance(item, list):
            item = [replace_values(elem, files_) for elem in item]
        elif isinstance(item, str):  # Проверка, что item - строка
            match = re.fullmatch(r"@(\d+)", item)
            if match:
                index = int(match.group(1))  # Получаем число после @
                if index < len(files_):
                    item = save_file_and_generate_link(files_[index])
                else:
                    raise ValueError(f"Файл с индексом {index} отсутствует в переданном массиве файлов.")
        return item

    # Создаем копию данных и передаем её для обработки
    values = replace_values(data, files.getlist("files[]"))
    return values



def compare_files(file1, file2):
    """
    Сравнивает два файла побайтово и возвращает True, если они идентичны.
    """
    with open(file1, 'rb') as f1, open(file2, 'rb') as f2:
        return f1.read() == f2.read()