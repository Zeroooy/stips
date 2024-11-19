from django.db import models

# Create your models here.


class User(models.Model):
    session_id = models.TextField("ID Сессии")

    login = models.TextField("Логин")
    password = models.TextField("Пароль")

    role = models.IntegerField("Роль", default=0)

    surname = models.TextField("Фамилия")
    name = models.TextField("Имя")
    middlename = models.TextField("Отчество")

    email = models.TextField("Адрес")
    phone = models.TextField("Номер телефона")

    def __str__(self):
        return str(self.surname) + " " + str(self.name) + " " + str(self.middlename)

    def is_admin(self):
        return self.role == 1

    def is_jury(self):
        return self.role == 2

    def is_inspector(self):
        return self.role == 3


    def get_role(self):
        roles = {
            0: "Студент",
            1: "Администратор",
            2: "Жюри",
            3: "Инспектор"
        }
        return roles.get(self.role)


        # Получаем объект по session
    @staticmethod
    def get_user_by_session(session):
        users = User.objects.filter(session_id=session)
        if users.exists():
            return users.first()
        else:
            return None


    # Проверяем есть ли запись по логину и паролю
    @staticmethod
    def check_user_by_login_password(login, password):
        users = User.objects.filter(login=login, password=password)
        return users.exists()




class Statement(models.Model):
    user_id = models.IntegerField("ID Пользователя", default=-1)

    status = models.IntegerField("Статус", default=0)

    json = models.JSONField("Json", default=list)

    mark_studies = models.BooleanField("Оценка учеба", default=False)
    comment_studies = models.TextField("Комментарий учеба")

    mark_science = models.BooleanField("Оценка наука", default=False)
    comment_science = models.TextField("Комментарий наука")

    mark_activities = models.BooleanField("Оценка мероприятия", default=False)
    comment_activities = models.TextField("Комментарий мероприятия")

    mark_culture = models.BooleanField("Оценка культура", default=False)
    comment_culture = models.TextField("Комментарий культура")

    mark_sport = models.BooleanField("Оценка спорт", default=False)
    comment_sport = models.TextField("Комментарий спорт")

    points = models.IntegerField("Баллы", default=0)


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

    def get_status(self):
        statuses = {
            0: "На проверке",
            1: "Ошибочно",
            2: "Проверено",
            3: "Конфликтное",
            4: "Одобрено",
            5: "Отклонено"
        }
        return statuses.get(self.status)


    def set_status_up(self):
        if self.status == 1:
            self.status = 0
        elif self.status == 0:
            self.status = 2

    def set_status_down(self):
        if self.status == 0:
            self.status = 1
        elif self.status == 2:
            self.status = 0

    @staticmethod
    def system_checkout(counts):
        statements = Statement.objects.filter(status=2).order_by('-points')

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
                    s.status = 4
                counts -= len(i)
            elif len(i) < counts and counts > 0:
                for s in i:
                    s.status = 3
                counts -= len(i)
            else:
                for s in i:
                    s.status = 5












