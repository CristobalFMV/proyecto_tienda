# Generated by Django 4.2.1 on 2023-07-10 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_boleta_carrito'),
    ]

    operations = [
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero_boleta', models.CharField(max_length=10)),
                ('fecha', models.DateField()),
                ('nombre_cliente', models.CharField(max_length=100)),
                ('subscripcion', models.BooleanField()),
                ('monto_total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('estado_actual', models.CharField(max_length=100)),
            ],
        ),
    ]
