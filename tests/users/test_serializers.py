import pytest
from django.contrib.auth import get_user_model
from django_countries.serializer_fields import CountryField
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework.fields import CharField, BooleanField, ImageField, SerializerMethodField

from apps.users.serializers import UserSerializer

User = get_user_model()


@pytest.fixture
def serializer_instance(base_user):
    return UserSerializer(instance=base_user)


def test_serializer_fields(serializer_instance):
    data = serializer_instance.data
    assert set(data.keys()) == {
        "id", "username", "email", "first_name",
        "last_name", "full_name", "gender", "phone_number",
        "profile_photo", "country", "city", "top_agent"
    }
    assert isinstance(serializer_instance.fields["gender"], CharField)
    assert isinstance(serializer_instance.fields["phone_number"], PhoneNumberField)
    assert isinstance(serializer_instance.fields["profile_photo"], ImageField)
    assert isinstance(serializer_instance.fields["country"], CountryField)
    assert isinstance(serializer_instance.fields["city"], CharField)
    assert isinstance(serializer_instance.fields["top_agent"], BooleanField)
    assert isinstance(serializer_instance.fields["first_name"], SerializerMethodField)
    assert isinstance(serializer_instance.fields["last_name"], SerializerMethodField)
    assert isinstance(serializer_instance.fields["full_name"], SerializerMethodField)


def test_get_first_name(serializer_instance, base_user):
    assert serializer_instance.get_first_name(serializer_instance.instance) == base_user.first_name


def test_get_last_name(serializer_instance, base_user):
    assert serializer_instance.get_last_name(serializer_instance.instance) == base_user.last_name


def test_get_full_name(serializer_instance, base_user):
    assert serializer_instance.get_full_name(serializer_instance.instance) == f"{base_user.first_name} {base_user.last_name}"


def test_to_representation(serializer_instance):
    data = serializer_instance.to_representation(serializer_instance.instance)
    if serializer_instance.instance.is_superuser:
        assert data.get("admin") is True
    else:
        assert "admin" not in data
