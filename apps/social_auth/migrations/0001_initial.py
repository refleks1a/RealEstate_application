# Generated by Django 5.0 on 2024-02-06 16:50

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="CustomSession",
            fields=[
                (
                    "pkid",
                    models.BigAutoField(
                        editable=False, primary_key=True, serialize=False
                    ),
                ),
                (
                    "id",
                    models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("state", models.CharField(max_length=255)),
                (
                    "application",
                    models.CharField(
                        choices=[
                            ("GOOGLE", "GOOGLE"),
                            ("FACEBOOK", "FACEBOOK"),
                            ("GITHUB", "GITHUB"),
                            ("INSTAGRAM", "INSTAGRAM"),
                        ],
                        max_length=63,
                        verbose_name="Application type",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
