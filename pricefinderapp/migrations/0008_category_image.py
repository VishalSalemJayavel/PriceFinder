# Generated by Django 4.0.6 on 2023-09-21 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pricefinderapp', '0007_product_currency_product_unit'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='image',
            field=models.ImageField(null=True, upload_to='category_images'),
        ),
    ]
