import pytest
from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory
from rest_framework.test import APIRequestFactory
from rest_framework import status
from unittest.mock import patch
from django.contrib.auth import get_user_model

from apps.social_auth.views import GoogleLoginApi, GoogleLoginRedirectApi


User =  get_user_model()


@pytest.fixture
def rf():
    return APIRequestFactory()

@pytest.fixture
def request_factory():
    return RequestFactory()


@pytest.fixture
def google_login_flow_service_mock():
    with patch('apps.social_auth.views.GoogleRawLoginFlowService') as mock:
        yield mock.return_value


@pytest.mark.django_db
def test_google_login_redirect_api_get(rf):
    request = rf.get('/social-auth/redirect')
    response = GoogleLoginRedirectApi.as_view()(request)
    assert response.status_code == status.HTTP_302_FOUND


@pytest.mark.django_db
def test_google_login_api_get_with_error(rf):
    request = rf.get('/social-auth/callback', {'error': 'some_error'})
    response = GoogleLoginApi.as_view()(request)
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_google_login_api_get_with_invalid_params(rf):
    request = rf.get('/social-auth/callback', {'error': 'some_error'})
    response = GoogleLoginApi.as_view()(request)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
