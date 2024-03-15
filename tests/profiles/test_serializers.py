import pytest
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile

from apps.profiles.serializers import ProfileSerializer, UpdateProfileSerializer

User = get_user_model()

@pytest.fixture
def update_profile_data():
    return {
        "phone_number": "+1234567890",
        "profile_photo": SimpleUploadedFile("profile.jpg", b"file_content", content_type="image/jpeg"),
        "about_me": "Test about me",
        "license": "ABC123",
        "gender": "Male",
        "country": "US",
        "city": "New York",
        "is_buyer": True,
        "is_seller": False,
        "is_agent": True,
    }

@pytest.fixture
def profile_serializer(profile):
    return ProfileSerializer(instance=profile)

@pytest.fixture
def update_profile_serializer(profile, update_profile_data):
    return UpdateProfileSerializer(instance=profile, data=update_profile_data)

def test_profile_serializer_fields(profile_serializer):
    data = profile_serializer.data
    assert set(data.keys()) == {
        "username", "first_name", "last_name", "full_name", "email", "id",
        "phone_number", "profile_photo", "about_me", "license", "gender",
        "country", "city", "is_buyer", "is_seller", "is_agent", "rating",
        "num_reviews", "reviews"
    }

def test_profile_serializer_get_full_name(profile, profile_serializer):
    assert profile_serializer.get_full_name(profile) == f"{profile.user.first_name} {profile.user.last_name}"

def test_profile_serializer_get_reviews(profile, profile_serializer):
    assert profile_serializer.get_reviews(profile) == []

def test_profile_serializer_get_profile_photo(profile, profile_serializer):
    assert profile_serializer.get_profile_photo(profile) == profile.profile_photo.url

def test_update_profile_serializer_fields(update_profile_serializer):
    data = update_profile_serializer.initial_data
    assert set(data.keys()) == {
        "phone_number", "profile_photo", "about_me", "license", "gender",
        "country", "city", "is_buyer", "is_seller", "is_agent"
    }
 
