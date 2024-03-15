import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND

import copy
from django.http import QueryDict

from apps.properties.views import (ListAgentsPropertyAPIView, ListAllPropertiesAPIView,
                                    PropertyDetailAPIView, PropertySearchAPIView,
                                    PropertyViewsAPIView, create_property_api_view,
                                    delete_property_api_view, update_property_api_view)

from apps.properties.models import Property

User = get_user_model()


# Auth
@pytest.fixture
def authenticated_request_factory():
    factory = APIRequestFactory()
    user = User.objects.create_user(username='testuser', password='testpassword',
                                     first_name="John", last_name="Doe", email="helloworld@gmail.com")
    return factory, user


# API fixtures
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
def property_detail_api_view(authenticated_request_factory):
    factory, user = authenticated_request_factory
    Property.objects.create(country="USA", city="Dallas", title="Some property", user=user)

    request = factory.get('/property/some-property/')

    return PropertyDetailAPIView.as_view()(request, slug='some-property')


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

@pytest.fixture
def update_property(authenticated_request_factory):
    factory, user = authenticated_request_factory
    request = factory.put('/properties/update/some-property/')
    force_authenticate(request, user=user)
    
    request.data = {'title': 'Updated Title', 'description': 'Updated description'}

    return update_property_api_view(request, slug='some-property')


@pytest.fixture
def delete_property(authenticated_request_factory):
    factory, user = authenticated_request_factory
    request = factory.delete('/properties/delete/some-property/')
    force_authenticate(request, user=user)

    return delete_property_api_view(request, slug='some-property')


# Tests
@pytest.mark.django_db
def test_list_all_properties_api_view(list_all_properties_api_view):
    response = list_all_properties_api_view

    assert response.status_code == HTTP_200_OK


@pytest.mark.django_db
def test_list_agents_property_api_view(list_agents_property_api_view):
    response = list_agents_property_api_view

    assert response.status_code == HTTP_200_OK


@pytest.mark.django_db
def test_property_detail_api_view(property_detail_api_view):
    response = property_detail_api_view

    assert response.status_code == HTTP_200_OK


@pytest.mark.django_db
def test_property_search_api_view(property_search_api_view):
    response = property_search_api_view

    assert response.status_code == HTTP_200_OK


@pytest.mark.django_db
def test_property_views_api_view(property_views_api_view):
    response = property_views_api_view

    assert response.status_code == HTTP_200_OK


@pytest.mark.django_db
def test_update_property_api_view(update_property):
    response = update_property

    assert response.status_code == HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_delete_property_api_view(delete_property):
    response = delete_property

    assert response.status_code == HTTP_404_NOT_FOUND
