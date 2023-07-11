from django import forms
from django.forms import ModelForm
from .models import Producto
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    rut = forms.CharField(label='RUT', widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Ejemplo: 10123123-K'}))
    nombres = forms.CharField(label='NOMBRES', widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Ingrese sus nombres'}))
    apellidos = forms.CharField(label='APELLIDOS', widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Ingrese sus apellidos'}))
    correo = forms.EmailField(label='CORREO ELECTRÓNICO', widget=forms.EmailInput(
        attrs={'class': 'form-control', 'placeholder': 'Ingrese su correo electrónico'}))
    direccion = forms.CharField(label='DIRECCIÓN', widget=forms.Textarea(
        attrs={'class': 'form-control', 'rows': 3, 'placeholder': 'Ingrese su dirección'}))
    aporte = forms.BooleanField(
        label='Deseo inscribirme con un aporte.', required=False)
    foto_perfil = forms.ImageField(label='FOTO DE PERFIL', required=False, widget=forms.ClearableFileInput(attrs={'class': 'form-control-file'}))
    password1 = forms.CharField(label="PASSWORD", widget=forms.PasswordInput(
        attrs={'class': 'form-control', 'placeholder': 'Ingrese su password'}))
    password2 = forms.CharField(label="CONFIRMAR PASSWORD", widget=forms.PasswordInput(
        attrs={'class': 'form-control', 'placeholder': 'Repita su password'}))

    def save(self, commit=True):
        user = super().save(commit=False)
        # Asignar el correo como valor del username
        user.username = self.cleaned_data['correo']
        if commit:
            user.save()
        return user

    class Meta:
        model = CustomUser
        fields = ['rut', 'nombres', 'apellidos', 'correo', 'direccion',
            'aporte', 'password1', 'password2', 'foto_perfil']


class UserLoginForm(AuthenticationForm):
    
    username = forms.CharField(label="Nombre de usuario", widget=forms.TextInput(
        attrs={'class': 'form-control'}))
    password = forms.CharField(label="Contraseña", widget=forms.PasswordInput(
        attrs={'class': 'form-control'}))

    class Meta:
        model = CustomUser
        fields = ['username', 'password']


class CustomUserForm(forms.ModelForm):
    rut = forms.CharField(label='RUT', widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Ejemplo: 10123123-K'}))
    nombres = forms.CharField(label='NOMBRES', widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Ingrese sus nombres'}))
    apellidos = forms.CharField(label='APELLIDOS', widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Ingrese sus apellidos'}))
    correo = forms.EmailField(label='CORREO ELECTRÓNICO', widget=forms.EmailInput(
        attrs={'class': 'form-control', 'placeholder': 'Ingrese su correo electrónico'}))
    direccion = forms.CharField(label='DIRECCIÓN', widget=forms.Textarea(
        attrs={'class': 'form-control', 'rows': 3, 'placeholder': 'Ingrese su dirección'}))
    aporte = forms.BooleanField(
        label='Deseo inscribirme con un aporte.', required=False)
    foto_perfil = forms.ImageField(label='FOTO DE PERFIL', required=False,
                            widget=forms.ClearableFileInput(attrs={'class': 'form-control-file'}))
    password1 = forms.CharField(label="PASSWORD", widget=forms.PasswordInput(
        attrs={'class': 'form-control', 'placeholder': 'Ingrese su password'}))
    password2 = forms.CharField(label="CONFIRMAR PASSWORD", widget=forms.PasswordInput(
        attrs={'class': 'form-control', 'placeholder': 'Repita su password'}))
    is_superuser = forms.BooleanField(label='Tipo de usuario', required=False)

    def save(self, commit=True):
        user = super().save(commit=False)
        # Asignar el correo como valor del username
        user.username = self.cleaned_data['correo']
        if commit:
            user.save()
        return user

    class Meta:
        model = CustomUser
        fields = ['rut', 'nombres', 'apellidos', 'correo',
                'direccion', 'aporte', 'foto_perfil', 'is_superuser','password1','password2']


class ProductoForm(ModelForm):
    class Meta:
        model = Producto
        fields = ['codigo', 'nombreprod', 'descripcion', 'imagen', 'precio', 'descuento_subscriptor', 'descuento_oferta', 'stockprod','categoria']
