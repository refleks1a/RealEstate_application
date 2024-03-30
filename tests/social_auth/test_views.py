import pytest

from django.urls import reverse
from django.test import RequestFactory
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST

from apps.social_auth.views import GoogleLoginApi
from apps.social_auth.models import CustomSession


@pytest.mark.django_db
def test_input_validation():
    factory = RequestFactory()
    request = factory.get("/social-auth/callback/")

    response = GoogleLoginApi.as_view()(request)
    assert response.status_code == HTTP_400_BAD_REQUEST
    assert "Code and state are required." in str(response.content)


@pytest.mark.django_db
def test_csrf_check():
    CustomSession.objects.create(state="valid_state", application="GOOGLE")

    factory = RequestFactory()
    request = factory.get("/social-auth/callback/", data={"code": "valid_code", "state": "invalid_state"})

    response = GoogleLoginApi.as_view()(request)
    assert response.status_code == HTTP_400_BAD_REQUEST
    assert "CSRF check failed." in str(response.content)


@pytest.mark.django_db
def test_error_check():
    CustomSession.objects.create(state="valid_state", application="GOOGLE")

    factory = RequestFactory()
    request = factory.get("/social-auth/callback/", data={"code": "valid_code", "state": "invalid_state", "error":"Some error"})

    response = GoogleLoginApi.as_view()(request)
    assert response.status_code == HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_session_state_check():
    factory = RequestFactory()
    request = factory.get("/social-auth/callback/", data={"code": "valid_code", "state": "invalid_state"})

    response = GoogleLoginApi.as_view()(request)
    assert response.status_code == HTTP_400_BAD_REQUEST
    assert "CSRF check failed." in str(response.content) 
