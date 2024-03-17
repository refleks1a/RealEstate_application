import pytest

from apps.blog.models import Post
from apps.blog.serializers import PostSerializer


@pytest.mark.django_db
def test_post_serializer(profile):
    post = Post.objects.create(title="Test Post", body="Test body content", author=profile)

    serializer = PostSerializer(post)

    assert serializer.data["title"] == "Test Post"
    assert serializer.data["body"] == "Test body content"
