# core/posts/tests/test_serializers.py

import pytest
from apps.blog.models import Post
from apps.blog.serializers import PostSerializer, PostCreateSerializer, PostViewSerializer

@pytest.mark.django_db
def test_post_serializer(profile):
    post = Post.objects.create(title="Test Post", body="Test body content", author=profile)

    serializer = PostSerializer(post)

    assert serializer.data["title"] == "Test Post"
    assert serializer.data["body"] == "Test body content"

# Similar tests for PostCreateSerializer and PostViewSerializer
# ...

# Add more test cases as needed
