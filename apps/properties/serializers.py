from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Property, PropertyViews
from ..profiles.models import Profile
from ..profiles.serializers import ProfileSerializer


class PropertySerializer(serializers.ModelSerializer):
    country = CountryField(name_only=True)
    profile = serializers.SerializerMethodField()

    cover_photo = serializers.SerializerMethodField()
    photo1 = serializers.SerializerMethodField()
    photo2 = serializers.SerializerMethodField()
    photo3 = serializers.SerializerMethodField()
    photo4 = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = [
            "id",
            "profile",
            "title",
            "slug",
            "reference_code",
            "description",
            "country",
            "city",
            "postal_code",
            "street_address",
            "property_number",
            "price",
            "tax",
            "final_property_price",
            "plot_area",
            "total_floors",
            "bedrooms",
            "bathrooms",
            "advert_type",
            "property_type",
            "cover_photo",
            "photo1",
            "photo2",
            "photo3",
            "photo4",
            "published_status",
            "views",
        ]
    
    def get_profile(self, obj):
        profile = Profile.objects.get(user=obj.user)
        serializer = ProfileSerializer(profile)
        return serializer.data

    def get_cover_photo(self, obj):
        return obj.cover_photo.url
    
    def get_photo1(self, obj): 
        return obj.photo1.url
    
    def get_photo2(self, obj):
        return obj.photo2.url
    
    def get_photo3(self, obj):
        return obj.photo3.url
    
    def get_photo4(self, obj):
        return obj.photo4.url
    

class PropertyCreateSerializer(serializers.ModelSerializer):
    country = CountryField(name_only=True)

    class Meta:
        model = Property
        exclude = [
            "updated_at", "pkid", "views", "reference_code", "user"
        ]


class PropertyViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyViews
        exclude = [
            "updated_at", "pkid",
        ]
