from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

from apps.common.models import TimeStampedUUIDModel

User = get_user_model()


class Gender(models.TextChoices):
    MALE = "Male", gettext_lazy("Male")
    FEMALE = "Female", gettext_lazy("Female")
    OTHER = "Other", gettext_lazy("Other")
    

class Profile(TimeStampedUUIDModel):
    user = models.OneToOneField(User, related_name="profile",
                                on_delete=models.CASCADE)
    phone_number = PhoneNumberField(verbose_name=gettext_lazy("Phone number"),
                                    max_length=30, default="+000000000000")
    about_me = models.TextField(verbose_name=gettext_lazy("About me"), default="Something about yourself...")
    license = models.CharField(max_length=31, verbose_name=gettext_lazy("Real Estate license"),
                               blank=True, null=True)
    profile_photo = models.ImageField(verbose_name=gettext_lazy("Profile photo"), default="/profile_default.png")
    gender = models.CharField(verbose_name=gettext_lazy("Gender"), choices=Gender.choices,
                              default=Gender.OTHER, max_length=31)
    
    country = CountryField(verbose_name=gettext_lazy("Country"), default="AZ",
                            blank=False, null=False)
    city = models.CharField(verbose_name=gettext_lazy("City"), default="Baku",
                            max_length=127, blank=False, null=False)
    
    is_buyer = models.BooleanField(verbose_name=gettext_lazy("Buyer"), default=False,
                                help_text=gettext_lazy("Are you looking to buy a property?"))
    is_seller = models.BooleanField(verbose_name=gettext_lazy("Seller"), default=False,
                                    help_text=gettext_lazy("Are you looking to sell a property?"))
    is_agent = models.BooleanField(verbose_name=gettext_lazy("Agent"), default=False,
                                   help_text=gettext_lazy("Are an agent?"))
    
    top_agent = models.BooleanField(verbose_name=gettext_lazy("Top agent"), default=False)
    rating = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(verbose_name=gettext_lazy("Number of reviews"), default=0,
                                      null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username}'s profile"
    