import pytest

from apps.enquiries.models import Enquiry


@pytest.mark.django_db
def test_enquiry_str():
    enquiry = Enquiry.objects.create(
        subject="Test Inquiry",
        name="John Doe",
        email="john@example.com",
        message="This is a test message."
    )

    assert enquiry.__str__() == "john@example.com"
