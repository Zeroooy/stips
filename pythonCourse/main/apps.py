from django.apps import AppConfig

class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'main'

    # Если новая БД то чтобы не вставлять
#    def ready(self):
#        create_default_records()



def create_default_records():
    from .models import Status, Role, Period
    from django.db.utils import OperationalError

    try:
        # Добавляем фиксированные записи
        Period.create_default_records()
        Status.create_default_records()
        Role.create_default_records()
    except OperationalError:
        # Если база данных ещё не готова (например, при миграциях), пропускаем
        pass