# Generated by Django 5.0 on 2023-12-16 11:07

import phonenumber_field.modelfields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("profiles", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="profile",
            name="licence",
        ),
        migrations.AddField(
            model_name="profile",
            name="license",
            field=models.CharField(
                blank=True, max_length=31, null=True, verbose_name="Real Estate license"
            ),
        ),
        migrations.AlterField(
            model_name="profile",
            name="is_buyer",
            field=models.BooleanField(
                default=False,
                help_text="Are you looking to buy a property?",
                verbose_name="Buyer",
            ),
        ),
        migrations.AlterField(
            model_name="profile",
            name="phone_number",
            field=phonenumber_field.modelfields.PhoneNumberField(
                default="+000000000000",
                max_length=30,
                region=None,
                verbose_name="Phone number",
            ),
        ),
    ]