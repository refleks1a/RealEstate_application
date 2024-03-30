import pytest

from apps.social_auth.models import CustomSession


# Tests -----


@pytest.mark.django_db
def test_custom_session_str():
    session = CustomSession.objects.create(
        state="Sample State",
        application="GOOGLE"
    )

    assert session.__str__() == session.application
