import pytest 

from django.contrib.auth import get_user_model

from rest_framework.test import APIRequestFactory

from apps.ratings.models import Rating
from apps.ratings.serializers import RatingSerializer


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
def test_rating_serializer(authenticated_request_factory, profile):
    factory, user=authenticated_request_factory

    new_rating = Rating.objects.create(
        rater=user,
        agent=profile,
        rating=1,
        comment="Sample",
    )

    serializer = RatingSerializer(new_rating)

    assert serializer.data["rater"] == f"{new_rating.rater.username}"
    assert serializer.data["agent"] == f"{new_rating.agent.user.username}"
