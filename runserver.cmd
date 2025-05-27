@echo off
REM Переходим в папку, где находится этот .cmd файл
cd /d "%~dp0"

REM Активируем виртуальное окружение и запускаем Django-сервер
.\.venv\Scripts\python.exe pythonCourse\manage.py runserver
pause