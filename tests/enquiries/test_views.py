import pytest
from django.contrib.auth import get_user_model

from rest_framework.test import APIRequestFactory, force_authenticate

from rest_framework import status
from apps.enquiries.models import Enquiry
from apps.enquiries.views import send_enquiry_email


User =  get_user_model()


# Auth -----


@pytest.fixture
def authenticated_request_factory():
    factory = APIRequestFactory()
    user = User.objects.create_user(username='testuser', password='testpassword',
                                     first_name="John", last_name="Doe", email="helloworld@gmail.com")
    return factory, user


# Tests -----


@pytest.mark.django_db
def test_send_enquiry_email_success(authenticated_request_factory):
    factory, user = authenticated_request_factory
    
    data = {
        "subject": "Test Inquiry",
        "name": "John Doe",
        "email": "john@example.com",
        "message": "This is a test message.",
    }

    request = factory.post("/enquiries/", data)
    force_authenticate(request, user=user)

    response = send_enquiry_email(request)

    assert response.status_code == status.HTTP_200_OK
