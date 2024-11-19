from django.shortcuts import render

# ТУТ САМИ VIEWS НАШЕГО МОДУЛЯ


def admin_page(request):
    return render(request, 'adminpanel/index.html')

def login_page(request):
    return render(request, 'login/index.html')

def menu_page(request):
    return render(request, 'menu/index.html')



def login_mobile_page(request):
    return render(request, 'login/index_m.html')

def menu_mobile_page(request):
    return render(request, 'menu/index_m.html')

