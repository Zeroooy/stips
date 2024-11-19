#!/usr/bin/env python

# САМОЕ ГЛАВНОЕ ПРОЕКТА (ЗАПУСКАЕМ ВСЕ ОТСЮДА)
# python manage.py startapp main    - создать приложение(модуль сайта(не страница))
# python manage.py runserver    -    запустить сервер
import os
import sys


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pythonCourse.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
