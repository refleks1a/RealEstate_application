import random
import string

from autoslug import AutoSlugField
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy
from django_countries.fields import CountryField

from apps.common.models import TimeStampedUUIDModel


User = get_user_model()


class PropertyPublishedManager(models.Manager):
    def get_queryset(self):
        return (
            super(PropertyPublishedManager, self)
            .get_queryset()
            .filter(published_status=True)
        )


class Property(TimeStampedUUIDModel):

    class AdvertType(models.TextChoices):
        FOR_SALE = "For sale", gettext_lazy("For sale")
        FOR_RENT = "For rent", gettext_lazy("For rent")
        ACTION = "Auction", gettext_lazy("Auction")

    class PropertyType(models.TextChoices):
        HOUSE = "House", gettext_lazy("House")
        APARTMENT = "Apartment", gettext_lazy("Apartment")
        OFFICE = "Office", gettext_lazy("Office")
        WAREHOUSE = "Warehouse", gettext_lazy("Warehouse")  
        COMMERCIAL = "Commercial", gettext_lazy("Commercial")
        OTHER = "Other", gettext_lazy("Other")

    user = models.ForeignKey(User, verbose_name = gettext_lazy("Agent, seller or buyer"),
        related_name = "agent_buyer", on_delete=models.DO_NOTHING)
    title = models.CharField(verbose_name=gettext_lazy("Property Title"), max_length=255) 
    slug = AutoSlugField(populate_from="title", unique=True, always_update=True)
    reference_code = models.CharField(verbose_name=gettext_lazy("Property reference code"),
        max_length=255, unique=True, blank=True)
    description = models.TextField(verbose_name=gettext_lazy("Description"),
        default="Default description (Should be changed!)")
    
    country = CountryField(verbose_name=gettext_lazy("Country"),
        default="Default country (Should be changed!)", blank_label="(select country)")
    city = models.CharField(verbose_name=gettext_lazy("City"), max_length=255,
        default="Default city (Should be changed!)")
    postal_code = models.CharField(verbose_name=gettext_lazy("Postal code"), max_length=127,
        default="Default postal code (Should be changed!)")
    street_address = models.CharField(verbose_name=gettext_lazy("Street address"), max_length=127, 
        default="Default street address (Should be changed!)")
    property_number = models.IntegerField(verbose_name=gettext_lazy("property number"),
        validators=[MinValueValidator(1)], default=1)
    
    price = models.DecimalField(verbose_name=gettext_lazy("Price"), max_digits=10,
        decimal_places=2, default=0.0)
    tax = models.DecimalField(verbose_name=gettext_lazy("Property tax"), max_digits=6,
        decimal_places=2, default=0.0, help_text="0% property tax charged")
    
    plot_area = models.DecimalField(verbose_name=gettext_lazy("Plot area(m^2)"), max_digits=9,
        decimal_places=2, default=0.0)
    total_floors = models.IntegerField(verbose_name=gettext_lazy("Number of floors"), default=0)
    bedrooms = models.IntegerField(verbose_name=gettext_lazy("Bedrooms"), default=1)
    bathrooms = models.DecimalField(verbose_name=gettext_lazy("Bathrooms"), max_digits=4,
        decimal_places=2, default=1.0)
    advert_type = models.CharField(verbose_name=gettext_lazy("Avert type"), max_length=63,
        choices=AdvertType.choices, default=AdvertType.FOR_RENT)
    property_type = models.CharField(verbose_name=gettext_lazy("Property type"), max_length=63,
        choices=PropertyType.choices, default=PropertyType.OTHER)
    
    cover_photo = models.ImageField(verbose_name=gettext_lazy("Main photo"), default = "/house_sample.jpg",
        null=True, blank=True)
    photo1 = models.ImageField(verbose_name=gettext_lazy("Photo 1"), default = "/interior_sample.jpg",
        null=True, blank=True)
    photo2 = models.ImageField(verbose_name=gettext_lazy("Photo 2"), default = "/interior_sample.jpg",
        null=True, blank=True)
    photo3 = models.ImageField(verbose_name=gettext_lazy("Photo 3"), default = "/interior_sample.jpg",
        null=True, blank=True)
    photo4 = models.ImageField(verbose_name=gettext_lazy("Photo 4"), default = "/interior_sample.jpg",
        null=True, blank=True)

    published_status = models.BooleanField(verbose_name=gettext_lazy("Published status"),
        default=False)
    views = models.IntegerField(verbose_name=gettext_lazy("Total views"), default=0)
    
    objects = models.Manager()
    published = PropertyPublishedManager()

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = gettext_lazy('Property')
        verbose_name_plural = gettext_lazy("Properties")

    def save(self, *args, **kwargs):
        self.title = str.title(self.title)
        self.description = str.capitalize(self.description)
        self.reference_code = "".join(random.choices(
            string.ascii_uppercase + string.digits + string.ascii_lowercase, k=15
            ))
        super(Property, self).save(*args, **kwargs)

    @property
    def final_property_price(self):
        tax_percentage = self.tax    
        property_price = self.price
        tax_amount = round(tax_percentage*property_price, 2)
        price_after_tax = float(round(property_price + tax_amount, 2))
        
        return price_after_tax
    

class PropertyViews(TimeStampedUUIDModel):
    ip = models.CharField(verbose_name=gettext_lazy("IP address"), max_length=256)
    property = models.ForeignKey(Property, related_name="property_views",
        on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Total views on: {self.property.title} is - {self.property.views} view(s)"
    
    class Meta:
        verbose_name = "Total views on property"
        verbose_name_plural = "Total property views"
    