import json
from rest_framework.renderers import JSONRenderer
from apps.profiles.renderers import ProfileJSONRenderer  


def test_profile_renderer_no_errors():
    data = {"username": "john_doe", "email": "john@example.com"}

    renderer = ProfileJSONRenderer()

    rendered_data = renderer.render(data)

    assert json.loads(rendered_data) == {"profile": data}

def test_profile_renderer_with_errors():
    error_data = {"errors": ["Invalid input"]}

    renderer = ProfileJSONRenderer()

    rendered_data = renderer.render(error_data)

    assert json.loads(rendered_data) == error_data

