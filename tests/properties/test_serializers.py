import pytest
from django.contrib.auth import get_user_model

from apps.properties.models import Property, PropertyViews
from apps.profiles.models import Profile
from apps.properties.serializers import PropertySerializer, PropertyCreateSerializer, PropertyViewSerializer


User = get_user_model()

@pytest.fixture
def user():
    return User.objects.create_user(username='testuser', email='test1@example.com', password='password',
        first_name="John", last_name="Doe")


@pytest.fixture
def profile(user):
    return Profile.objects.create(user=user)

@pytest.fixture
def sample_property(user, profile):
    return Property.objects.create(
        user=user,
        profile=profile,
        title="Test Property",
        slug="test-property",
        description="This is a test property.",
        country="US",
        city="New York",
        postal_code="10001",
        street_address="123 Test St",
        property_number="123",
        price=100000,
        tax=5000,
        plot_area=500,
        total_floors=2,
        bedrooms=3,
        bathrooms=2,
        advert_type="SELL",
        property_type="HOUSE",
        published_status=True
    )


@pytest.fixture
def sample_property_views(sample_property):
    return PropertyViews.objects.create(property=sample_property)


@pytest.mark.django_db
def test_property_create_serializer(user):
    data = {
        'title': 'Test Property',
        'slug': 'test-property',
        'description': 'This is a test property.',
        'country': 'US',
        'city': 'New York',
        'postal_code': '10001',
        'street_address': '123 Test St',
        'property_number': '123',
        'price': 100000,
        'tax': 5000,
        'final_property_price': 105000,
        'plot_area': 500,
        'total_floors': 2,
        'bedrooms': 3,
        'bathrooms': 2,
        'advert_type': 'For sale',
        'property_type': 'House',
        'published_status': True
    }
    serializer = PropertyCreateSerializer(data=data)
    assert serializer.is_valid(), serializer.errors
    instance = serializer.save(user=user)
    assert instance.user == user
