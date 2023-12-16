from django.db import models
from django.utils.translation import gettext_lazy
from phonenumber_field.modelfields import PhoneNumberField
from apps.common.models import TimeStampedUUIDModel


class Enquiry(TimeStampedUUIDModel):
    name = models.CharField(verbose_name=gettext_lazy("Your name"), max_length=127)
    phone_number = PhoneNumberField(verbose_name=gettext_lazy("Phone number"), max_length=31,
        default="+000000000000")
    email = models.EmailField(verbose_name=gettext_lazy("Email"))
    subject = models.CharField(verbose_name=gettext_lazy("Subject"), max_length=127)
    message = models.TextField(verbose_name=gettext_lazy("Message"))

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Enquiries" 