from django.contrib import admin
from .models import Producto, Categoria, CustomUser

# Register your models here.

admin.site.register(Categoria)
admin.site.register(Producto)
admin.site.register(CustomUser)
