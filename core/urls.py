from django.urls import path
from .views import inicio, Administracion, bodega, boleta, carrito, ficha
from .views import ingreso, mant_prod, mis_datos, miscompras, nosotros
from .views import registro, ropita, usuario, ventas, cerrar_sesion, agregar_al_carrito, eliminar_carrito,pagar


urlpatterns = [
path('', inicio, name="inicio"),
path('Administracion', Administracion, name="Administracion"),
path('bodega', bodega, name="bodega"),
path('boleta', boleta, name="boleta"),
path('carrito', carrito, name="carrito"),
path('eliminar-carrito/<int:carrito_id>/',eliminar_carrito, name='eliminar_carrito'),

path('ingreso', ingreso, name="ingreso"),
path('mantenedor de productos/<action>/<id>', mant_prod, name="mant_prod"),
path('mis datos', mis_datos, name="mis_datos"),
path('mis compras', miscompras, name="miscompras"),
path('nosotros', nosotros, name="nosotros"),
path('registro', registro, name="registro"),
path('ropita', ropita, name="ropita"),
path('usuario', usuario, name="usuario"),
path('ventas', ventas, name="ventas"),
path('ficha/<id>', ficha, name="ficha"),
path('agregar-carrito/<str:id_producto>/',agregar_al_carrito, name='agregar_carrito'),
path('pagar/', pagar, name='pagar'),

path('cerrar-sesion', cerrar_sesion, name='cerrar_sesion'),
]
