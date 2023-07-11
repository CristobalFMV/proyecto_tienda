from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Categoria(models.Model):
    idCategoria = models.IntegerField(primary_key=True, verbose_name="Id de categoría")
    nombreCategoria = models.CharField(max_length=80, blank=False, null=False, verbose_name="Nombre de la categoría")

    def __str__(self):
        return self.nombreCategoria


class Bodega(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
# Create Modelo para producto

class Producto(models.Model):
    codigo = models.CharField(max_length=6, primary_key=True, verbose_name="Codigo")
    nombreprod = models.CharField(max_length=80, blank=True, null=True, verbose_name="nombre del producto")
    descripcion = models.CharField(max_length=80, null=True, blank=True, verbose_name="descripcion")
    imagen = models.ImageField(upload_to="images/", default="sinfoto.jpg", null=False, blank=False, verbose_name="Imagen")
    precio = models.PositiveIntegerField(default=0)
    descuento_subscriptor = models.PositiveIntegerField(default=0)
    descuento_oferta = models.PositiveIntegerField(default=0)
    stockprod = models.PositiveIntegerField(default=0)
    categoria = models.ForeignKey(Categoria, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.codigo
    
class CustomUser(AbstractUser):
    rut = models.CharField(max_length=12, unique=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    correo = models.EmailField(max_length=255)
    direccion = models.TextField()
    aporte = models.BooleanField(default=False)
    foto_perfil = models.ImageField(upload_to='fotos_perfil/', default='fotos_perfil/default.png', null=False, blank=True, )

    class Meta:
        swappable = 'AUTH_USER_MODEL'
        verbose_name = 'Usuario personalizado'
        verbose_name_plural = 'Usuarios personalizados'


# Agregar related_name a los campos groups y user_permissions
CustomUser.groups.related_name = 'customuser_set'
CustomUser.user_permissions.related_name = 'customuser_set'


class Carrito(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    descuento_subcriptor = models.DecimalField(max_digits=5, decimal_places=2)
    descuento_oferta = models.DecimalField(max_digits=5, decimal_places=2)
    descuento_total = models.DecimalField(max_digits=5, decimal_places=2)
    descuento = models.DecimalField(max_digits=10, decimal_places=2)
    precio_total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.producto.nombre
    
class Boleta(models.Model):
    numero = models.CharField(max_length=10)
    producto = models.CharField(max_length=100)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    descuento_subscriptor = models.DecimalField(max_digits=5, decimal_places=2)
    descuento_oferta = models.DecimalField(max_digits=5, decimal_places=2)
    descuento_total = models.DecimalField(max_digits=5, decimal_places=2)
    descuento = models.DecimalField(max_digits=10, decimal_places=2)
    precio_total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.numero
    
class Venta(models.Model):
    numero_boleta = models.CharField(max_length=10)
    fecha = models.DateField()
    nombre_cliente = models.CharField(max_length=100)
    subscripcion = models.BooleanField()
    monto_total = models.DecimalField(max_digits=10, decimal_places=2)
    estado_actual = models.CharField(max_length=100)

    def __str__(self):
        return self.numero_boleta
    
class Compra(models.Model):
    numero_boleta = models.CharField(max_length=10)
    fecha_venta = models.DateField()
    fecha_despacho = models.DateField()
    fecha_entrega = models.DateField()
    monto_total = models.DecimalField(max_digits=10, decimal_places=2)
    estado_actual = models.CharField(max_length=20)

    def __str__(self):
        return self.numero_boleta
    
class Ropa(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='ropa')
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

