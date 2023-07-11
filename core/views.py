from django.utils import timezone
import random
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth import login, authenticate, logout
from .models import Boleta, Categoria, Compra, CustomUser, Producto, Bodega, Carrito, Ropa, Venta
from .forms import CustomUserForm, ProductoForm, CustomUserCreationForm, UserLoginForm
from django.contrib.auth.decorators import login_required
from decimal import Decimal, ROUND_DOWN
from django.db.models import Sum

# Create your views here.
def inicio(request):
    data = {"list": Producto.objects.all().order_by('codigo')}
    return render(request, 'core/inicio.html', context=data)


def ficha(request, id):
    producto = Producto.objects.get(codigo=id)
    context = {"producto": producto}  # Pasar el producto al contexto
    return render(request, 'core/ficha.html', context)


@login_required
def Administracion(request):
    return render(request, 'core/Administracion.html')


@login_required
def bodega(request):
    if request.method == "POST":
        categoria_id = request.POST.get('categoria')
        nombre = request.POST.get('nombre')
        estado = request.POST.get('estado')

        categoria = Categoria.objects.get(idCategoria=categoria_id)
        bodega = Bodega(categoria=categoria, nombre=nombre, estado=estado)
        bodega.save()

    elif request.method == "GET" and 'eliminar' in request.GET:
        bodega_id = request.GET.get('eliminar')
        Bodega.objects.filter(id=bodega_id).delete()

    categorias = Categoria.objects.all()
    bodegas = Bodega.objects.all()

    return render(request, 'core/bodega.html', {'categorias': categorias, 'bodegas': bodegas})

@login_required
def boleta(request):
    boletas = Boleta.objects.all()

    # Calcular el precio sin IVA
    precio_sin_iva = boletas.aggregate(total=Sum('precio_unitario'))['total']

    if precio_sin_iva is None:
        precio_sin_iva = Decimal('0')

    # Calcular el IVA (19% del precio sin IVA)
    iva = precio_sin_iva * Decimal('0.19')

    # Calcular el total a pagar (precio sin IVA + IVA)
    total_pagar = precio_sin_iva + iva

    contexto = {
        'boletas': boletas,
        'precio_sin_iva': precio_sin_iva,
        'iva': iva,
        'total_pagar': total_pagar
    }

    return render(request, 'core/boleta.html', contexto)

@login_required
def carrito(request):
    carritos = Carrito.objects.all()

    # Cálculo de los valores del carrito
    precio_sin_iva = Decimal(0)
    valor_iva = Decimal(0)
    total_pagar = Decimal(0)

    for carrito in carritos:
        precio_sin_iva += carrito.precio_total

    # Supongamos que el valor del IVA es el 19%
    valor_iva = precio_sin_iva * Decimal(0.19)
    valor_iva = valor_iva.quantize(Decimal('0.00'), rounding=ROUND_DOWN)

    total_pagar = precio_sin_iva + valor_iva
    total_pagar = total_pagar.quantize(Decimal('0.00'), rounding=ROUND_DOWN)

    contexto = {
        'carritos': carritos,
        'precio_sin_iva': precio_sin_iva,
        'valor_iva': valor_iva,
        'total_pagar': total_pagar
    }

    return render(request, 'core/carrito.html', contexto)

@login_required
def eliminar_carrito(request, carrito_id):
    carrito = Carrito.objects.get(id=carrito_id)
    carrito.delete()

    return redirect('carrito')

def registro(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            # Autenticar y crear sesión para el usuario
            correo = form.cleaned_data.get('correo')
            password = form.cleaned_data.get('password1')
            user = authenticate(request, username=correo, password=password)
            if user is not None:
                login(request, user)
                return redirect('inicio')
            return redirect('inicio')
    else:
        form = CustomUserCreationForm()
    return render(request, 'core/registro.html', {'form': form, 'logged_in': request.user.is_authenticated})


def ingreso(request):
    form = UserLoginForm(request, data=request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('inicio')
        else:
            # Handle invalid form submission
            print(form.errors)

    return render(request, 'core/ingreso.html', {'form': form, 'logged_in': request.user.is_authenticated})


def mant_prod(request, action, id):
    data = {"mesg": "", "form": ProductoForm, "action": action, "id": id}
    if action == 'ins':
        if request.method == "POST":
            form = ProductoForm(request.POST, request.FILES)
            if form.is_valid():
                try:
                    form.save()
                    data["mesg"] = "¡El producto fue creado correctamente!"
                except:
                    data["mesg"] = "¡No se puede crear dos productos con el mismo codigo!"

    elif action == 'upd':
        objeto = Producto.objects.get(codigo=id)
        if request.method == "POST":
            form = ProductoForm(data=request.POST,
                                files=request.FILES, instance=objeto)
            if form.is_valid():
                form.save()
                data["mesg"] = "¡El producto fue actualizado correctamente!"
        data["form"] = ProductoForm(instance=objeto)

    elif action == 'del':
        try:
            Producto.objects.get(codigo=id).delete()
            data["mesg"] = "¡El producto fue eliminado correctamente!"
            return redirect(mant_prod, action='ins', id='-1')
        except:
            data["mesg"] = "¡El producto ya estaba eliminado!"

    data["list"] = Producto.objects.all().order_by('codigo')
    return render(request, 'core/mant_prod.html', data)


def mis_datos(request):
    user = request.user
    return render(request, 'core/mis_datos.html', {'user': user})

def miscompras(request):
    compras = Compra.objects.all()
    contexto = {
        'compras': compras
    }
    return render(request, 'core/miscompras.html', contexto)

def calcular_total_pagar(carritos):
    total = Decimal(0)
    for carrito in carritos:
        precio_total = carrito.precio_total
        if precio_total is not None:
            total += Decimal(precio_total)
    return total

def pagar(request):
    # Obtener datos del carrito
    carritos = Carrito.objects.all()
    total_pagar = calcular_total_pagar(carritos)

    # Generar número de boleta aleatorio
    numero_boleta = str(random.randint(100, 999))

    # Crear registros en Boleta por cada producto en el carrito
    boletas = []
    for carrito in carritos:
        boleta = Boleta.objects.create(
            numero=str(random.randint(100, 999)),
            producto=carrito.producto.marca,
            cantidad=carrito.cantidad,
            precio_unitario=carrito.precio_unitario,
            descuento_subscriptor=carrito.descuento_subcriptor,
            descuento_oferta=carrito.descuento_oferta,
            descuento_total=carrito.descuento_total,
            descuento=carrito.descuento,
            precio_total=carrito.precio_total
        )
        boletas.append(boleta)

    # Crear registro en Venta
    venta = Venta.objects.create(
        numero_boleta=numero_boleta,
        fecha=timezone.now(),
        nombre_cliente=request.user.nombres,
        subscripcion=request.user.is_superuser,
        monto_total=total_pagar,
        estado_actual="Pendiente"
    )

    # Crear registro en Compra
    # Crear registro en Compra
    compra = Compra.objects.create(
        numero_boleta=numero_boleta,
        fecha_venta=venta.fecha,
        fecha_despacho=timezone.localtime(timezone.now()),
        fecha_entrega=timezone.localtime(timezone.now()),
        monto_total=total_pagar,
        estado_actual="Pendiente"
    )
    # Eliminar registros del carrito

    return redirect('miscompras')

def nosotros(request):
    return render(request, 'core/nosotros.html')

def ropita(request):
    ropas = Ropa.objects.all()
    contexto = {
        'ropas': ropas
    }
    return render(request, 'core/ropita.html', contexto)

@login_required
def usuario(request):
    form = CustomUserForm()

    if request.method == 'POST':
        form = CustomUserForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_superuser = form.cleaned_data['is_superuser']
            user.save()
            form = CustomUserForm()

    usuarios = CustomUser.objects.all()

    contexto = {
        'form': form,
        'usuarios': usuarios
    }

    return render(request, 'core/usuario.html', contexto)

def ventas(request):
    ventas = Venta.objects.all()

    contexto = {
        'ventas': ventas
    }

    return render(request, 'core/ventas.html', contexto)


def cerrar_sesion(request):
    logout(request)
    return redirect('inicio')

@login_required
def agregar_al_carrito(request, id_producto):
    producto = Producto.objects.get(codigo=id_producto)

    print(request.user.id)

    cantidad = 1  # Cantidad ajustada según tu necesidad
    precio_unitario = producto.precio

    # Cálculo de descuentos con porcentajes aleatorios
    descuento_subcriptor = Decimal(random.uniform(0, 10)).quantize(
        Decimal('0.00'), rounding=ROUND_DOWN)
    descuento_oferta = Decimal(random.uniform(0, 10)).quantize(
        Decimal('0.00'), rounding=ROUND_DOWN)
    descuento_total = Decimal(random.uniform(0, 20)).quantize(
        Decimal('0.00'), rounding=ROUND_DOWN)
    descuento = Decimal(random.uniform(0, 5)).quantize(
        Decimal('0.00'), rounding=ROUND_DOWN)

    # Cálculo del precio total con descuentos aplicados
    precio_descuento_subcriptor = precio_unitario * \
        (1 - descuento_subcriptor / 100)
    precio_descuento_oferta = precio_descuento_subcriptor * \
        (1 - descuento_oferta / 100)
    precio_descuento_total = precio_descuento_oferta * \
        (1 - descuento_total / 100)
    precio_total = precio_descuento_total * (1 - descuento / 100)

    carrito = Carrito(
        producto=producto,
        cantidad=cantidad,
        precio_unitario=precio_unitario,
        descuento_subcriptor=descuento_subcriptor,
        descuento_oferta=descuento_oferta,
        descuento_total=descuento_total,
        descuento=descuento,
        precio_total=precio_total
    )
    carrito.save()

    mensaje = "El producto ha sido agregado al carrito correctamente."

    return render(request, 'core/ficha.html', {'producto': producto, 'mensaje': mensaje})