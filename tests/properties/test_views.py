import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_403_FORBIDDEN

from apps.properties.views import (ListAgentsPropertyAPIView, ListAllPropertiesAPIView,
                                    PropertyDetailAPIView, PropertySearchAPIView,
                                    PropertyViewsAPIView, create_property_api_view,
                                    delete_property_api_view, update_property_api_view)

from apps.properties.models import Property
from apps.properties.serializers import PropertyCreateSerializer

User = get_user_model()


# Auth -----
@pytest.fixture
def authenticated_request_factory():
    factory = APIRequestFactory()
    user = User.objects.create_user(username='testuser', password='testpassword',
                                     first_name="John", last_name="Doe", email="helloworld@gmail.com")
    return factory, user


# API fixtures -----
@pytest.fixture
def list_all_properties_api_view():
    factory = APIRequestFactory()
    request = factory.get('/properties/')
    
    return ListAllPropertiesAPIView.as_view()(request)


@pytest.fixture
def list_agents_property_api_view(authenticated_request_factory):
    factory, user = authenticated_request_factory
    request = factory.get('/agents/properties/')
    force_authenticate(request, user=user)

    return ListAgentsPropertyAPIView.as_view()(request)

@pytest.fixture
def property_search_api_view():
    factory = APIRequestFactory()
    request = factory.post('/properties/search/')

    request.data = {'advert_type': 'sell'}

    return PropertySearchAPIView.as_view()(request)


@pytest.fixture
def property_views_api_view():
    factory = APIRequestFactory()
    request = factory.get('/property-views/')

    return PropertyViewsAPIView.as_view()(request)

# API Fixtures - CRUD
@pytest.fixture
def property_detail_api_view(authenticated_request_factory):
    factory, user = authenticated_request_factory
    Property.objects.create(country="USA", city="Dallas", title="Some property", user=user)

    request = factory.get('/property/some-property/')

    return PropertyDetailAPIView.as_view()(request, slug='some-property')

@pytest.fixture
def update_property(authenticated_request_factory):
    factory, user = authenticated_request_factory

    data = {
        "advert_type": "For rent",
        "property_type": "Flat",
        "price": "$100000+",
        "bedrooms": "3+",
        "bathrooms": "1+",
        "cath_phrase": "description2",
        "country": "USA",
    }

    request = factory.put('/properties/update/some-property/', data)
    
    force_authenticate(request, user=user)
    
    return update_property_api_view(request, slug='some-property')


@pytest.fixture
def delete_property(authenticated_request_factory):
    factory, user = authenticated_request_factory
    Property.objects.create(user=user, title="Some Property", country="USA")
    request = factory.delete('/properties/delete/some-property/')
    force_authenticate(request, user=user)

    return delete_property_api_view(request, slug='some-property')


# Tests -----


@pytest.mark.django_db
def test_list_all_properties_api_view(list_all_properties_api_view):
    response = list_all_properties_api_view

    assert response.status_code == HTTP_200_OK


@pytest.mark.django_db
def test_list_agents_property_api_view(list_agents_property_api_view):
    response = list_agents_property_api_view

    assert response.status_code == HTTP_200_OK


# Test - Property search
@pytest.mark.django_db
def test_property_search_api_view(property_search_api_view):
    response = property_search_api_view

    assert response.status_code == HTTP_200_OK

@pytest.mark.django_db
def test_property_search_post(authenticated_request_factory):
    factory, user = authenticated_request_factory     
    
    Property.objects.create(
        user = user,
        published_status=True,
        advert_type='For sell',
        property_type='House',
        price=50000,
        bedrooms=2,
        bathrooms=1.0,
        description='description1',
        country="USA"
    )
    
    data = {
        "user":user.id,
        "advert_type": "For sell",
        "property_type": "House",
        "price": "$50000+",
        "bedrooms": "2+",
        "bathrooms": "1+",
        "cath_phrase": "description1",
        "country": "USA",
    }

    request = factory.post('/properties/search/', data)
    response = PropertySearchAPIView.as_view()(request)
    
    assert response.status_code == 200
    assert len(response.data) == 1


@pytest.mark.django_db
def test_property_views_api_view(property_views_api_view):
    response = property_views_api_view

    assert response.status_code == HTTP_200_OK

# Test - CRUD

# Test - CRUD - Read property
@pytest.mark.django_db
def test_property_detail_api_view(property_detail_api_view):
    response = property_detail_api_view

    assert response.status_code == HTTP_200_OK

# Test - CRUD - Update property
@pytest.mark.django_db
def test_update_property_api_view(update_property):
    response = update_property

    assert response.status_code == HTTP_404_NOT_FOUND

@pytest.mark.django_db
def test_update_property_not_your_property(authenticated_request_factory):
    factory, user = authenticated_request_factory
    new_user = User.objects.create_user(username='newuser', password='testpassword',
        first_name="John", last_name="Doe", email="helloworld1@gmail.com")
    Property.objects.create(user=new_user, title="Test Slug", country="USA")

    request = factory.put('/properties/update/test-slug/')
    
    force_authenticate(request, user=user)
    
    request.data = {'title': 'Updated Title', 'description': 'Updated description'}

    response = update_property_api_view(request, slug='test-slug')

    assert response.status_code == HTTP_403_FORBIDDEN


# Test - CRUD - Delete property
@pytest.mark.django_db
def test_delete_property_api_view(delete_property):
    response = delete_property

    assert response.status_code == HTTP_200_OK   

@pytest.mark.django_db
def test_delete_property_not_your_property(authenticated_request_factory):
    factory, user = authenticated_request_factory
    new_user = User.objects.create_user(username='newuser', password='testpassword',
        first_name="John", last_name="Doe", email="helloworld1@gmail.com")
    Property.objects.create(user=new_user, title="Test Slug", country="USA")

    request = factory.delete('/properties/delete/test-slug/')
    
    force_authenticate(request, user=user)
    
    response = delete_property_api_view(request, slug='test-slug')

    assert response.status_code == HTTP_403_FORBIDDEN   

@pytest.mark.django_db
def test_delete_property_property_does_not_exist(authenticated_request_factory):
    factory, user = authenticated_request_factory
    request = factory.delete('/properties/delete/test-slug/')
    
    force_authenticate(request, user=user)
    
    response = delete_property_api_view(request, slug='test-slug')

    assert response.status_code == HTTP_404_NOT_FOUND 
