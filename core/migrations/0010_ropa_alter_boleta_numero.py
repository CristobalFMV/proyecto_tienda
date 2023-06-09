# Generated by Django 4.2.1 on 2023-07-10 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_compra'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ropa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField()),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('imagen', models.ImageField(upload_to='ropa')),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='boleta',
            name='numero',
            field=models.CharField(max_length=10),
        ),
    ]
