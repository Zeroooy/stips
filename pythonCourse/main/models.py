from datetime import datetime, timezone
from email.policy import default

from django.db import models
from django.template.defaultfilters import random
from django.core.files.storage import FileSystemStorage
import re
# Create your models here.


class Status(models.Model):
    name = models.TextField("Статус", default="")

    @classmethod
    def create_default_records(cls):
        # Данные для записи
        default_records = [
            {'id': 0, 'name': "process"},
            {'id': 1, 'name': "error"},
            {'id': 2, 'name': "verified"},
            {'id': 3, 'name': "conflict"},
            {'id': 4, 'name': "confirm"},
            {'id': 5, 'name': "deny"}
        ]
        for record in default_records:
            cls.objects.get_or_create(**record)











class Role(models.Model):
    name = models.TextField("Роль", default="")

    @classmethod
    def create_default_records(cls):
        # Данные для записи
        default_records = [
            {'id': 0, 'name': "Student"},
            {'id': 1, 'name': "Administrator"},
            {'id': 2, 'name': "Jury"},
            {'id': 3, 'name': "Inspector studies"},
            {'id': 4, 'name': "Inspector science"},
            {'id': 5, 'name': "Inspector activities"},
            {'id': 6, 'name': "Inspector culture"},
            {'id': 7, 'name': "Inspector sport"},
        ]
        for record in default_records:
            cls.objects.get_or_create(**record)













class User(models.Model):

    id = models.TextField("Идентификатор", unique=True, editable=False, blank=True, primary_key=True)

    session = models.TextField("ID Сессии", default="", blank=True)

    login = models.TextField("Логин",default="")
    password = models.TextField("Пароль")

    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='users', default=0)

    surname = models.TextField("Фамилия", blank=True)
    name = models.TextField("Имя")
    middlename = models.TextField("Отчество", blank=True)

    email = models.TextField("Адрес", blank=True)
    phone = models.TextField("Номер телефона", blank=True)

    inst = models.TextField("Институт", blank=True)
    group = models.TextField("Группа", blank=True)

    def __str__(self):
        return str(self.surname) + " " + str(self.name) + " " + str(self.middlename)

    def save(self, *args, **kwargs):
        if not self.id:  # Генерировать ID только если он ещё не установлен
            self.id = User.generate_id()
        super().save(*args, **kwargs)

    def get_data(self):
        return {"surname" : self.surname,
                "name" : self.name,
                "middlename": self.middlename,
                "role": self.role.name,
                "user-id": self.id
                }

    def get_data_full(self):
        return {"session" : self.session,
                "surname" : self.surname,
                "login" : self.login,
                "password" : self.password,
                "name" : self.name,
                "middlename": self.middlename,
                "role": self.role.name,
                "user-id": self.id,
                "email": self.email,
                "phone": self.phone
                }

    def generate_session(self):
        key = ""
        for i in range(50):
            key += random("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
        self.session = key
        self.save()
        return key

    def is_student(self):
        return self.role and self.role.id == 0

    def is_admin(self):
        return self.role and self.role.id == 1

    def is_jury(self):
        return self.role and self.role.id == 2

    def is_inspector(self):
        return self.role and self.role.id in [3, 4, 5, 6, 7]


    def get_role(self):
        return self.role.name


    def change_role(self, new_role):
        new_role = int(new_role)
        self.role = Role.objects.filter(id = new_role).last()
        self.save()

    # Получаем объект по session
    @staticmethod
    def get_by_session(session):
        users = User.objects.filter(session=session)
        if users.exists():
            return users.first()
        else:
            return None

    # Получаем объект по id
    @staticmethod
    def get_by_id(id_):
        users = User.objects.filter(id=id_)
        if users.exists():
            return users.first()
        else:
            return None


    # Получаем запись по логину и паролю
    @staticmethod
    def get_by_login_password(login, password):
        users = User.objects.filter(login=login, password=password)
        if users.exists():
            return users.first()
        else:
            return None


    def get_statements(self):
        statements = Statement.objects.filter(user_id=self.id)
        if statements.exists():
            return statements
        else:
            return []



    def get_id(self):
        return self.id


    @staticmethod
    def add(login, password, role, name, surname):
        user = User.objects.create(id=User.generate_id(),login=login, password=password, role=Role.objects.get(id=role), name=name, surname=surname)
        user.save()

    @staticmethod
    def get_users_info():
        users_info = {}
        for i in range(8):
            users_info[i] = []
            for s in User.objects.filter(role__id = i):
                users_info[i].append(s.get_data())

        return users_info



    @staticmethod
    def generate_id():
        while True:
            key = ""
            for i in range(50):
                key += random("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
            if not User.objects.filter(id=key).exists():  # Проверка на уникальность
                return key



    @classmethod
    def create_default_records(cls):
        # Данные для записи
        default_records = [
            {'login': "admin", 'password': "admin", 'role': Role.objects.get(id=1), 'surname': "Ульянов", 'name': "Александр", 'middlename': "Сергеевич", 'email': "herobrinechekplay@gmail.com", 'phone': "89005442577"},
            {'login': "admin2", 'password': "admin2", 'role': Role.objects.get(id=1), 'surname': "Гибалов", 'name': "Евгений", 'middlename': "Алексеевич", 'email': "process", 'phone': "process"},

            {'login': "inspector1", 'password': "inspector1", 'role': Role.objects.get(id=3), 'surname': "1 (Учеба)", 'name': "Инспектор", 'middlename': "-", 'email': "-", 'phone': "-"},
            {'login': "inspector2", 'password': "inspector2", 'role': Role.objects.get(id=4), 'surname': "2 (Наука)", 'name': "Инспектор", 'middlename': "-", 'email': "-", 'phone': "-"},
            {'login': "inspector3", 'password': "inspector3", 'role': Role.objects.get(id=5), 'surname': "Role.objects.get(id=3) (Активность)", 'name': "Инспектор", 'middlename': "-", 'email': "-", 'phone': "-"},
            {'login': "inspector4", 'password': "inspector4", 'role': Role.objects.get(id=6), 'surname': "4 (Культура)", 'name': "Инспектор", 'middlename': "-", 'email': "-", 'phone': "-"},
            {'login': "inspector5", 'password': "inspector5", 'role': Role.objects.get(id=7), 'surname': "5 (Спорт)", 'name': "Инспектор", 'middlename': "-", 'email': "-", 'phone': "-"},

            {'login': "jury", 'password': "jury", 'role': Role.objects.get(id=2), 'surname': "-", 'name': "Жюри", 'middlename': "-", 'email': "-", 'phone': "-"},

            {'login': "student", 'password': "student", 'role': Role.objects.get(id=0), 'surname': "Иванов", 'name': "Иван",
             'middlename': "Иванович", 'email': "ivan@gmail.com", 'phone': "909090909"},
            {'login': "student1", 'password': "student1", 'role': Role.objects.get(id=0), 'surname': "Александров", 'name': "Александр",
             'middlename': "Александрович", 'email': "alex@gmail.com", 'phone': "909090909"},
            {'login': "student2", 'password': "student2", 'role': Role.objects.get(id=0), 'surname': "Левкин", 'name': "Лев",
             'middlename': "Львович", 'email': "lev@gmail.com", 'phone': "909090909"},
            {'login': "student3", 'password': "student3", 'role': Role.objects.get(id=0), 'surname': "Евгеньев", 'name': "Евгений",
             'middlename': "Евгенич", 'email': "evgen@gmail.com", 'phone': "909090909"},
            {'login': "student4", 'password': "student4", 'role': Role.objects.get(id=0), 'surname': "Ярослав", 'name': "Ярослав",
             'middlename': "Ярослав", 'email': "yar@gmail.com", 'phone': "909090909"},
            {'login': "student5", 'password': "student5", 'role': Role.objects.get(id=0), 'surname': "Дима", 'name': "Дима",
             'middlename': "Дима", 'email': "dima@gmail.com", 'phone': "909090909"},
            {'login': "student6", 'password': "student6", 'role': Role.objects.get(id=0), 'surname': "Алексей", 'name': "Алексей",
             'middlename': "Алексей", 'email': "alexey@gmail.com", 'phone': "909090909"},
            {'login': "student7", 'password': "student7", 'role': Role.objects.get(id=0), 'surname': "Рафаель", 'name': "Рафаель",
             'middlename': "Рафаель", 'email': "raf@gmail.com", 'phone': "909090909"},
            {'login': "student8", 'password': "student8", 'role': Role.objects.get(id=0), 'surname': "Дони", 'name': "Дони",
             'middlename': "Дони", 'email': "doni@gmail.com", 'phone': "909090909"},
            {'login': "student9", 'password': "student9", 'role': Role.objects.get(id=0), 'surname': "Мики", 'name': "Мики",
             'middlename': "Мики", 'email': "miki@gmail.com", 'phone': "909090909"}
        ]
        for record in default_records:
            cls.objects.get_or_create(**record)









class Statement(models.Model):

    id = models.TextField("Идентификатор", unique=True, editable=False, blank=True, primary_key=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="statements", default=None)

    status = models.ForeignKey(Status, on_delete=models.CASCADE, related_name='statements', blank=True, default=0)

    json = models.JSONField("Json", default=list, blank=True)
    urls = models.JSONField("Json", default=list, blank=True)

    mark_studies = models.IntegerField("Оценка учеба", default=-1, blank=True)
    comment_studies = models.TextField("Комментарий учеба", blank=True)

    mark_science = models.IntegerField("Оценка наука", default=-1, blank=True)
    comment_science = models.TextField("Комментарий наука", blank=True)

    mark_activities = models.IntegerField("Оценка мероприятия", default=-1, blank=True)
    comment_activities = models.TextField("Комментарий мероприятия", blank=True)

    mark_culture = models.IntegerField("Оценка культура", default=-1, blank=True)      # СДЕЛАТЬ МИГРАТЕ
    comment_culture = models.TextField("Комментарий культура", blank=True)

    mark_sport = models.IntegerField("Оценка спорт", default=-1, blank=True)
    comment_sport = models.TextField("Комментарий спорт", blank=True)

    date = models.DateTimeField("Дата", default=datetime.now(), blank=True)

    points = models.IntegerField("Баллы", default=0, blank=True)

    old_status = models.BooleanField("Кеш-статус", blank=True, default=False)


    def get_data(self):
        return {"user" : str(self.user),
                "status" : self.status.name,
                "points": str(self.mark_studies) + " : " + str(self.mark_science) +" : " + str(self.mark_activities) +" : " + str(self.mark_culture) +" : " + str(self.mark_sport) +" | " + str(self.points),
                "date": self.date.strftime("%H:%M %d.%m.%Y"),
                "statement-id": self.id,
                "old-status": self.old_status
                }

    def get_json_data(self):
        return self.json

    def get_comments(self):
        return [self.comment_studies, self.comment_science, self.comment_activities, self.comment_culture, self.comment_sport ]

    def mark(self, user, value, comment):
        value = int(value)
        if user.role.id == 3:
            self.mark_studies = value
            self.comment_studies = comment
        elif user.role.id == 4:
            self.mark_science = value
            self.comment_science = comment
        elif user.role.id == 5:
            self.mark_activities = value
            self.comment_activities = comment
        elif user.role.id == 6:
            self.mark_culture = value
            self.comment_culture = comment
        elif user.role.id == 7:
            self.mark_sport = value
            self.comment_sport = comment
        self.points = self.mark_studies + self.mark_science + self.mark_activities + self.mark_culture + self.mark_sport

        if self.mark_studies != -1 and self.mark_science != -1 and self.mark_activities != -1 and self.mark_culture != -1 and self.mark_sport != -1 and self.status.id == 0:
            self.set_status(2)
        elif (self.mark_studies == -2 or self.mark_science == -2 or self.mark_activities == -2 or self.mark_culture == -2 or self.mark_sport == -2) and self.status.id == 0:
            self.set_status(1)
        else:
            self.save()

    def set_status(self, id_):
        new_status = int(id_)
        self.status = Status.objects.filter(id=new_status).last()
        self.save()

    def remove_files(self):
        if len(self.urls) != 0 and self.urls is not None:
            for file in self.urls:
                fs = FileSystemStorage(location="files")
                if fs.exists(file):
                    fs.delete(file)
            self.urls = {}
            self.save()

    def delete(self, *args, **kwargs):
        self.remove_files()
        super().delete(*args, **kwargs)

    @staticmethod
    def upload(user, json, files):
        date = datetime.now(timezone.utc)
        if Period.is_require(date):
            statement_temp = Statement.get_by_user(user)

            if statement_temp is not None and statement_temp.old_status is not True:
                json_change = Statement.replace_at_values_with_links(json, files)
                statement_temp.remove_files()
                statement_temp.json = json_change[0]
                statement_temp.urls = json_change[1]
                achievements = statement_temp.json['information']['achievements']
                if not ('Учеба' in achievements):
                    statement_temp.mark_studies = 0
                    statement_temp.comment_studies = 'Автоматическое выставление'
                if not ('Наука' in achievements):
                    statement_temp.mark_science = 0
                    statement_temp.comment_science = 'Автоматическое выставление'
                if not ('Общественная деятельность' in achievements):
                    statement_temp.mark_activities = 0
                    statement_temp.comment_activities = 'Автоматическое выставление'
                if not ('Культура и творчество' in achievements):
                    statement_temp.mark_culture = 0
                    statement_temp.comment_culture = 'Автоматическое выставление'
                if not ('Спорт' in achievements):
                    statement_temp.mark_sport = 0
                    statement_temp.comment_sport = 'Автоматическое выставление'
                statement_temp.date = datetime.now()
            else:
                json_change = Statement.replace_at_values_with_links(json, files)
                statement_temp = Statement.objects.create(id=Statement.generate_id(), user=user, json=json_change[0], date=date, urls = json_change[1])
                achievements = statement_temp.json['information']['achievements']
                if not ('Учеба' in achievements):
                    statement_temp.mark_studies = 0
                    statement_temp.comment_studies = 'Автоматическое выставление'
                if not ('Наука' in achievements):
                    statement_temp.mark_science = 0
                    statement_temp.comment_science = 'Автоматическое выставление'
                if not ('Общественная деятельность' in achievements):
                    statement_temp.mark_activities = 0
                    statement_temp.comment_activities = 'Автоматическое выставление'
                if not ('Культура и творчество' in achievements):
                    statement_temp.mark_culture = 0
                    statement_temp.comment_culture = 'Автоматическое выставление'
                if not ('Спорт' in achievements):
                    statement_temp.mark_sport = 0
                    statement_temp.comment_sport = 'Автоматическое выставление'
            statement_temp.set_status(0)
            statement_temp.save()

            return True
        else:
            return False



    @staticmethod
    def system_checkout(counts):
        statements = Statement.objects.filter(status__id=2).order_by('-points')

        part_of_statements = []
        prev_points = None
        temp = -1

        # Группировка заявлений с одинаковыми баллами
        for i in statements:
            if prev_points == i.points:
                part_of_statements[temp].append(i)
            else:
                part_of_statements.append([i])
                temp += 1
                prev_points = i.points

        # Сначала обрабатываем группы
        for group in part_of_statements:
            if counts >= len(group):
                # Мест хватает — одобрить всех
                for s in group:
                    s.set_status(4)
                counts -= len(group)
            elif counts > 0:
                # Мест не хватает — конфликт
                for s in group:
                    s.set_status(3)
                counts = 0
            else:
                # Мест нет — отклонить
                for s in group:
                    s.set_status(5)

    @staticmethod
    def get_by_user(user):
        statements = user.statements.all()
        if statements.exists():
            return statements.last()
        else:
            return None


    @staticmethod
    def get_by_id(statement_id):
        statements = Statement.objects.filter(id=statement_id)
        if statements.exists():
            return statements.last()
        else:
            return None

    @staticmethod
    def get_statements_by_statuses(statuses):
        statements_info = []
        for i in statuses:
            for s in Statement.objects.filter(status__name = i, old_status = False):
                statements_info.append(s.get_data())

        return statements_info

    @staticmethod
    def get_statements_old():
        statements_info = []
        for s in Statement.objects.filter(old_status = True):
            statements_info.append(s.get_data())

        return statements_info

    @staticmethod
    def get_part_statement(user, statement_id):
        statement = Statement.get_by_id(statement_id)
        statement = statement.get_json_data()
        if user.role.id == 3:
            return statement["studies"]
        elif user.role.id == 4:
            return statement["science"]
        elif user.role.id == 5:
            return statement["activities"]
        elif user.role.id == 6:
            return statement["culture"]
        elif user.role.id == 7:
            return statement["sport"]
        return None


    @staticmethod
    def generate_id():
        while True:
            key = ""
            for i in range(50):
                key += random("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
            if not Statement.objects.filter(id=key).exists():  # Проверка на уникальность
                return key


    @staticmethod
    def set_old():
        statements = Statement.objects.filter(old_status = False)
        for s in statements:
            s.old_status = True
            s.save()


    # Функция для замены значений "@n" на ссылки
    @staticmethod
    def replace_at_values_with_links(data, files):
        urls = []
        def replace_values(item, files_):
            nonlocal urls
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
                        fs = FileSystemStorage(location="files")
                        filename = fs.save(files_[index].name, files_[index])
                        item = fs.url(filename)
                        urls.append(filename)
                    else:
                        raise ValueError(f"Файл с индексом {index} отсутствует в переданном массиве файлов.")
            return item

        # Создаем копию данных и передаем её для обработки
        values = replace_values(data, files.getlist("file"))
        return [values, urls]













class Period(models.Model):
    date = models.DateTimeField("Дата")
    description = models.TextField("Описание")

    @staticmethod
    def get_period():
        return [Period.objects.get(id = 0).date.strftime("%H:%M %d.%m.%Y"), Period.objects.get(id = 1).date.strftime("%H:%M %d.%m.%Y")]

    @staticmethod
    def is_require(date):
        period_start = Period.objects.get(id=0).date
        period_end = Period.objects.get(id=1).date

        return period_start < date < period_end

    @staticmethod
    def set_start_and_end(datestr_start, datestr_end):
        period_temp = Period.objects.get(id = 0)
        period_temp.date = datetime.strptime(datestr_start, "%H:%M %d.%m.%Y")
        period_temp.save()

        period_temp = Period.objects.get(id = 1)
        period_temp.date = datetime.strptime(datestr_end, "%H:%M %d.%m.%Y")
        period_temp.save()

    @classmethod
    def create_default_records(cls):
        # Данные для записи
        default_records = [
            {'id': 0, 'date': datetime(2020, 1, 1, 0, 0, 0), 'description': "Дата, с которой можно подавать заявления."},
            {'id': 1, 'date': datetime(2020, 1, 1, 0, 0, 0), 'description': "Дата, до которой включительно можно подавать заявления."}
        ]
        for record in default_records:
            cls.objects.get_or_create(**record)













class Log(models.Model):
    event = models.TextField("Событие", default="")
    statement_copy = models.JSONField("Контент", blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="logs")
    date = models.DateTimeField("Дата", default=datetime.now(), blank=True)
    data = models.TextField("Примечание", default="")

    def get_data(self):
        return {"user" : str(self.user),
                "statement" : self.statement_copy,
                "event": self.event,
                "date": self.date,
                "data":self.data
                }

    @staticmethod
    def add(user, event, data, json):
        statement_temp = Log.objects.create(user=user, event=event, data=data, statement_copy=json, date=datetime.now())
        statement_temp.save()

    @staticmethod
    def get_list():
        logs = []
        for l in Log.objects.all():
            logs.append(l.get_data())

        return logs


    @staticmethod
    def reset():
        for s in Log.objects.all():
            s.delete()










