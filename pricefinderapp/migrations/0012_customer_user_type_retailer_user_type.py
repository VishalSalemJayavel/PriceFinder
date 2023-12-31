# Generated by Django 4.0.6 on 2023-09-27 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pricefinderapp', '0011_alter_customer_address_line_1_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='user_type',
            field=models.CharField(blank=True, default='customer', max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='retailer',
            name='user_type',
            field=models.CharField(blank=True, default='retailer', max_length=255, null=True),
        ),
    ]
