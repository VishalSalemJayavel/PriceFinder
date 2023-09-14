# Generated by Django 4.0.6 on 2023-09-14 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pricefinderapp', '0002_alter_customuser_user_permissions'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='date_of_birth',
        ),
        migrations.RemoveField(
            model_name='retailer',
            name='date_of_birth',
        ),
        migrations.AddField(
            model_name='customer',
            name='phone_number',
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='retailer',
            name='phone_number',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
