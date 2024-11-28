from datetime import datetime
from email.policy import default

from django.db import models
from django.template.defaultfilters import random
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
            {'id': 5, 'name': "deny"},
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

    def __str__(self):
        return str(self.surname) + " " + str(self.name) + " " + str(self.middlename)

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
            key += random("abcde!?:fghi^jkl*mnopq_+rstuv$wxy=zAB&CDEFG-HIJKLMNO#PQRSTUV@WXYZ0123456789")
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
        self.role = Role.objects.get(id = new_role)
        return users_info

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
            return None



    def get_id(self):
        return self.id


    @staticmethod
    def add(login, password, role, name, surname):
        user = User.objects.create(id=generate_id(),login=login, password=password, role=Role.objects.get(id=role), name=name, surname=surname)
        user.save()

    @staticmethod
    def get_users_info():
        users_info = {}
        for i in range(7):
            users_info[i] = []
            for s in User.objects.filter(role__id = i):
                users_info[i].append(s.get_data())

        return users_info



    @staticmethod
    def generate_id():
        while True:
            key = ""
            for i in range(50):
                key += random("abcde!?:fghi^jkl*mnopq_+rstuv$wxy=zAB&CDEFG-HIJKLMNO#PQRSTUV@WXYZ0123456789")
            if not MyModel.objects.filter(unique_id=key).exists():  # Проверка на уникальность
                return key













class Statement(models.Model):

    id = models.TextField("Идентификатор", unique=True, editable=False, blank=True, primary_key=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="statements", default=None)

    status = models.ForeignKey(Status, on_delete=models.CASCADE, related_name='statements', blank=True, default=0)

    json = models.JSONField("Json", default=list, blank=True)

    mark_studies = models.BooleanField("Оценка учеба", default=False, blank=True)
    comment_studies = models.TextField("Комментарий учеба", blank=True)

    mark_science = models.BooleanField("Оценка наука", default=False, blank=True)
    comment_science = models.TextField("Комментарий наука", blank=True)

    mark_activities = models.BooleanField("Оценка мероприятия", default=False, blank=True)
    comment_activities = models.TextField("Комментарий мероприятия", blank=True)

    mark_culture = models.BooleanField("Оценка культура", default=False, blank=True)
    comment_culture = models.TextField("Комментарий культура", blank=True)

    mark_sport = models.BooleanField("Оценка спорт", default=False, blank=True)
    comment_sport = models.TextField("Комментарий спорт", blank=True)

    date = models.DateTimeField("Дата", default=datetime.now(), blank=True)

    points = models.IntegerField("Баллы", default=0, blank=True)


    def get_data(self):
        return {"user" : str(self.user),
                "status" : self.status.name,
                "points": self.points,
                "date": self.date.strftime("%H:%M %d.%m.%Y"),
                "statement-id": self.id
                }


    def mark(self, user, value, comment):
        if user.id == 3:
            set_mark_studies(self, value, comment)
        elif user.id == 4:
            set_mark_science(self, value, comment)
        elif user.id == 5:
            set_mark_activities(self, value, comment)
        elif user.id == 6:
            set_mark_culture(self, value, comment)
        elif user.id == 7:
            set_mark_sport(self, value, comment)

    def set_mark_studies(self, value, comment):
        self.mark_studies = value
        if not value:
            self.comment_studies = comment
        else:
            self.check_all_marks()

    def set_mark_science(self, value, comment):
        self.mark_science = value
        if not value:
            self.comment_science = comment
        else:
            self.check_all_marks()

    def set_mark_activities(self, value, comment):
        self.mark_activities = value
        if not value:
            self.comment_activities = comment
        else:
            self.check_all_marks()

    def set_mark_culture(self, value, comment):
        self.mark_culture = value
        if not value:
            self.comment_culture = comment
        else:
            self.check_all_marks()

    def set_mark_sport(self, value, comment):
        self.mark_sport = value
        if not value:
            self.comment_sport = comment
        else:
            self.check_all_marks()


    def check_all_marks(self):
        if self.mark_studies and self.mark_science and self.mark_activities and self.mark_culture and self.mark_sport and self.status == 0:
            self.status = 2


    def set_status_up(self):
        if self.status.id == 1:
            self.status = Status.objects.get(id=0)
        elif self.status.id == 0:
            self.status = Status.objects.get(id=2)

    def set_status_down(self):
        if self.status.id == 0:
            self.status = Status.objects.get(id = 1)
        elif self.status.id == 2:
            self.status = Status.objects.get(id = 0)


    @staticmethod
    def upload(user, json):
        statement_temp = Statement.get_by_user(user)

        if statement_temp is not None:
            statement_temp.json = json
            statement_temp.date = datetime.now()
        else:
            statement_temp = Statement.objects.create(id=Statement.generate_id(), user=user, json=json, date=datetime.now())

        statement_temp.save()


    @staticmethod
    def system_checkout(counts):
        statements = Statement.objects.filter(status__id=2).order_by('-points')

        part_of_statements = {}
        prev_points = 0

        # пробегаем и формируем списки с одинаковыми баллами
        for i in statements:
            if prev_points == i.point:
                part_of_statements[i.point].append(i)
            else:
                part_of_statements[i.point] = [i]


        for i in part_of_statements:
            if len(i) > counts:
                for s in i:
                    s.status = Status.objects.get(id=4)
                counts -= len(i)
            elif len(i) < counts and counts > 0:
                for s in i:
                    s.status = Status.objects.get(id=3)
                counts -= len(i)
            else:
                for s in i:
                    s.status = Status.objects.get(id=5)



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
        statements_info = {}
        for i in statuses:
            statements_info[i] = []
            for s in Statement.objects.filter(status__name = i):
                statements_info[i].append(s.get_data())

        return statements_info

    @staticmethod
    def get_statement(statement_id):
        statement = Statement.objects.filter(id=statement_id).json
        return statement

    @staticmethod
    def get_part_statement(user, statement_id):
        statement = Statement.get_statement(statement_id)
        python_dict = json.loads(statement.json)
        if user.role.id == 3:
            return json.dumps(python_dict["studies"], ensure_ascii=False, indent=4)
        elif user.role.id == 4:
            return json.dumps(python_dict["science"], ensure_ascii=False, indent=4)
        elif user.role.id == 5:
            return json.dumps(python_dict["activities"], ensure_ascii=False, indent=4)
        elif user.role.id == 6:
            return json.dumps(python_dict["culture"], ensure_ascii=False, indent=4)
        elif user.role.id == 7:
            return json.dumps(python_dict["sport"], ensure_ascii=False, indent=4)
        return None


    @staticmethod
    def generate_id():
        while True:
            key = ""
            for i in range(50):
                key += random("abcde!?:fghi^jkl*mnopq_+rstuv$wxy=zAB&CDEFG-HIJKLMNO#PQRSTUV@WXYZ0123456789")
            if not MyModel.objects.filter(unique_id=key).exists():  # Проверка на уникальность
                return key
















class Period(models.Model):
    date = models.DateTimeField("Дата")
    description = models.TextField("Описание")

    @staticmethod
    def get_period():
        return [Period.objects.get(id = 0).date.strftime("%H:%M %d.%m.%Y"), Period.objects.get(id = 1).date.strftime("%H:%M %d.%m.%Y")]

    @staticmethod
    def is_require(date):
        return Period.objects.get(id = 0).date < date < Period.objects.get(id = 1).date

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

    def get_data(self):
        return {"user" : str(self.user),
                "statement" : self.statement_copy,
                "event": self.event,
                "date": self.date
                }

    @staticmethod
    def add(user, event, json):
        statement_temp = Log.objects.create(user=user, event=event ,statement_copy=json, date=datetime.now())
        statement_temp.save()







