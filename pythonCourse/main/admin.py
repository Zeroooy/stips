from django.contrib import admin

from .models import *
# Register your models here.



admin.site.register(User)
admin.site.register(Statement)
admin.site.register(Status)
admin.site.register(Role)
admin.site.register(Log)
admin.site.register(Period)