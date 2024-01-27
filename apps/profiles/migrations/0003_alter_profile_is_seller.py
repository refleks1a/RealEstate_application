# Generated by Django 5.0 on 2024-01-27 15:07

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("profiles", "0002_remove_profile_licence_profile_license_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="is_seller",
            field=models.BooleanField(
                default=False,
                help_text="Are you looking to sell a property?",
                verbose_name="Seller",
            ),
        ),
    ]