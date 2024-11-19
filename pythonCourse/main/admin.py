from django.contrib import admin

from .models import *
# Register your models here.



admin.site.register(User)
admin.site.register(UserToCourse)
admin.site.register(UserToSession)
admin.site.register(Course)
admin.site.register(Module)
admin.site.register(Lesson)
admin.site.register(DocumentElement)
admin.site.register(VideoElement)