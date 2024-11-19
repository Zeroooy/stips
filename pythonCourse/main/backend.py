from django.template.defaultfilters import random
from .models import UserToSession, User


def generate_key():
    key = ""
    for i in range(20):
        key += random("abcde!?:fghi^jkl*mnopq_+rstuv$wxy=zAB&CDEFG-HIJKLMNO#PQRSTUV@WXYZ0123456789")
    return key






