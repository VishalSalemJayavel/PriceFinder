# Generated by Django 4.0.6 on 2023-09-20 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pricefinderapp', '0003_remove_customer_date_of_birth_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='profile_picture',
            field=models.ImageField(null=True, upload_to='profile_pictures'),
        ),
        migrations.AddField(
            model_name='retailer',
            name='profile_picture',
            field=models.ImageField(null=True, upload_to='profile_pictures'),
        ),
    ]