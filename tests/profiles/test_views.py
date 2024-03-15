import pytest
from django.contrib.auth import get_user_model

from rest_framework.test import APIRequestFactory, force_authenticate
from apps.profiles.views import AgentListAPIView, TopAgentsListAPIView, GetProfileAPIView, GetUserProfile, UpdateProfileAPIView

from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_403_FORBIDDEN


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
def get_profile_api_view(authenticated_request_factory):
    factory, user = authenticated_request_factory
    request = factory.get('/profile/')
    force_authenticate(request, user=user)

    return GetProfileAPIView.as_view()(request)

@pytest.fixture
def get_user_profile_api_view():

    return GetUserProfile.as_view()

@pytest.fixture
def agent_list_api_view(authenticated_request_factory):
    factory, user = authenticated_request_factory
    request = factory.get('/agents/')
    force_authenticate(request, user=user)

    return AgentListAPIView.as_view()(request)

@pytest.fixture
def top_agents_list_api_view(authenticated_request_factory):
    factory, user = authenticated_request_factory
    request = factory.get('/top-agents/')
    force_authenticate(request, user=user)

    return TopAgentsListAPIView.as_view()(request)

@pytest.fixture
def update_profile_api_view(authenticated_request_factory):
    factory, user = authenticated_request_factory
    request = factory.patch('/profile/update/testuser/')
    force_authenticate(request, user=user)
    request.data = {"phone_number": "+1234567890", "about_me": "Test about me"}

    return  UpdateProfileAPIView.as_view()(request, username="testuser")
    

# Tests
@pytest.mark.django_db
def test_agent_list_api_view(agent_list_api_view):
    response = agent_list_api_view
    
    assert response.status_code == HTTP_200_OK

@pytest.mark.django_db
def test_top_agents_list_api_view(top_agents_list_api_view):
    response = top_agents_list_api_view

    assert response.status_code == HTTP_200_OK
    assert isinstance(response.data, list)

@pytest.mark.django_db
def test_get_profile_api_view(get_profile_api_view):
    response = get_profile_api_view

    assert response.status_code == HTTP_200_OK


# Tests - User Profile APIView
def test_get_user_profile_api_view(profile, get_user_profile_api_view):
    request = APIRequestFactory().get('/profile/1/')
    response = get_user_profile_api_view(request, id=profile.id)
    
    assert response.status_code == 200

@pytest.mark.django_db
def test_get_user_profile_profile_not_found(get_user_profile_api_view):
    request = APIRequestFactory().get('/profile/999/')
    response = get_user_profile_api_view(request, id=999)

    assert response.status_code == HTTP_404_NOT_FOUND


# Tests - Update Profile APIView
@pytest.mark.django_db
def test_update_profile_api_view(update_profile_api_view):
    response = update_profile_api_view

    assert response.status_code == HTTP_200_OK

@pytest.mark.django_db
def test_update_profile_profile_not_found(authenticated_request_factory):
    factory, user = authenticated_request_factory
    request = factory.patch('/profile/update/doesntexist/')

    force_authenticate(request, user=user)
    request.data = {"phone_number": "+1234567890", "about_me": "Test about me"}

    response = UpdateProfileAPIView.as_view()(request, username="doesntexist")
    assert response.status_code == HTTP_404_NOT_FOUND

@pytest.mark.django_db
def test_update_profile_not_your_profile(authenticated_request_factory):
    factory, user = authenticated_request_factory

    User.objects.create_user(username='newuser', password='testpassword',
        first_name="John", last_name="Doe", email="helloworld1@gmail.com")
    
    request = factory.patch('/profile/update/newuser/')
    force_authenticate(request, user=user)
    request.data = {"phone_number": "+1234567890", "about_me": "Test about me"}

    response = UpdateProfileAPIView.as_view()(request, username="newuser")
    assert response.status_code == HTTP_403_FORBIDDEN
