import pytest
from apps.blog.models import Post, PostViews


@pytest.mark.django_db
def test_post_creation(profile):
    post = Post.objects.create(
        title="Test Post",
        subtitle="Test Subtitle",
        body="Test body content",
        author=profile
    )

    assert post.title == "Test Post"
    assert post.subtitle == "Test Subtitle"


@pytest.mark.django_db
def test_post_str(profile):
    post = Post.objects.create(
        title="Test Post",
        subtitle="Test Subtitle",
        body="Test body content",
        author=profile
    )

    assert post.__str__() == "Test Post"


@pytest.mark.django_db
def test_post_review_str(profile):
    post = Post.objects.create(
        title="Test Post",
        subtitle="Test Subtitle",
        body="Test body content",
        author=profile
    )

    post_review = PostViews.objects.create(
        post=post
    )

    assert post_review.__str__() == f"Total views on: {post.reference_code} is - {post.views} view(s)"


@pytest.mark.django_db
def test_post_published_manager(profile):
    post1 = Post.objects.create(title="Published Post", published_status=True, author=profile)
    post2 = Post.objects.create(title="Unpublished Post", published_status=False, author=profile)

    published_posts = Post.published.all()

    assert post1 in published_posts
    assert post2 not in published_posts
