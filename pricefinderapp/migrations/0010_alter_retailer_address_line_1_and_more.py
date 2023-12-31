# Generated by Django 4.0.6 on 2023-09-22 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pricefinderapp', '0009_customer_address_line_1_customer_address_line_2_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='retailer',
            name='address_line_1',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='retailer',
            name='address_line_2',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='retailer',
            name='city',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='retailer',
            name='country',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='retailer',
            name='pincode',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='retailer',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pictures'),
        ),
        migrations.AlterField(
            model_name='retailer',
            name='state',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
