import pytest
from rest_framework.exceptions import ValidationError
from apps.enquiries.models import Enquiry
from apps.enquiries.serializers import EnquirySerializer


@pytest.mark.django_db
def test_valid_enquiry_serializer():
    enquiry_data = {
        "subject": "Test Inquiry",
        "message": "This is a test message.",
        "email": "example1@gmail.com",
        "phone_number": "+9940519005402",
        "name": "John Doe",
    }
    serializer = EnquirySerializer(data=enquiry_data)
    assert serializer.is_valid()


@pytest.mark.django_db
def test_invalid_enquiry_serializer():
    invalid_enquiry_data = {
    }
    serializer = EnquirySerializer(data=invalid_enquiry_data)
    with pytest.raises(ValidationError):
        serializer.is_valid(raise_exception=True)
