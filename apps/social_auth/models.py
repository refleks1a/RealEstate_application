from django.db import models
from django.utils.translation import gettext_lazy

from apps.common.models import TimeStampedUUIDModel


class CustomSession(TimeStampedUUIDModel):
    class ApplicationType(models.TextChoices):
        GOOGLE = "GOOGLE", gettext_lazy("GOOGLE")
        FACEBOOK = "FACEBOOK", gettext_lazy("FACEBOOK")
        GITHUB = "GITHUB", gettext_lazy("GITHUB")
        INSTAGRAM = "INSTAGRAM", gettext_lazy("INSTAGRAM")  

    state = models.CharField(max_length=255)
    application = models.CharField(verbose_name=gettext_lazy("Application type"), max_length=63,
        choices=ApplicationType.choices)

    def __str__(self):
        return self.application
