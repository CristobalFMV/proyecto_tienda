# Generated by Django 4.2.1 on 2023-07-10 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_customuser_foto_perfil_bodega'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='precio',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
    ]
