import pytest
from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST

from apps.profiles.models import Profile

from apps.blog.models import Post
from apps.blog.views import PostsListAPIView, PostDetailsAPIView, update_post_api_view, create_post_api_view, delete_post_api_view


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
def test_posts_list_api_view(authenticated_request_factory, profile):
    factory, user = authenticated_request_factory

    post1 = Post.objects.create(title="Post 1", author=profile)
    
    request = factory.get("/blog/all/")
    response = PostsListAPIView.as_view()(request)

    assert response.status_code == HTTP_200_OK


# Test - CRUD


# Test - CRUD - Read post
@pytest.mark.django_db
def test_posts_details_api_view(authenticated_request_factory, profile):
    factory, user = authenticated_request_factory

    post1 = Post.objects.create(title="Post 1", author=profile)
    
    request = factory.get(f"/blog/details/{post1.id}")
    response = PostDetailsAPIView.as_view()(request, post1.id)

    assert response.status_code == HTTP_200_OK

# Test - CRUD - Update post
@pytest.mark.django_db
def test_update_post_api_view(authenticated_request_factory):
    factory, user = authenticated_request_factory

    new_profile = Profile.objects.get(user=user)
    post1 = Post.objects.create(title="Post 1", author=new_profile)
    
    data = {
        "title": "Post 2"
    }

    request = factory.put(f"/blog/update/{post1.id}/", data)
    force_authenticate(request, user=user)

    response = update_post_api_view(request, post1.id)

    assert response.status_code == HTTP_200_OK


@pytest.mark.django_db
def test_update_post_post_not_found(authenticated_request_factory):
    factory, user = authenticated_request_factory
    
    data = {
        "title": "Post 2"
    }

    request = factory.put(f"/blog/update/999/", data)
    force_authenticate(request, user=user)

    response = update_post_api_view(request, 999)

    assert response.status_code == HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_update_post_not_your_post(authenticated_request_factory, profile):
    factory, user = authenticated_request_factory
    
    post1 = Post.objects.create(title="Post 1", author=profile)
    
    data = {
        "title": "Post 2"
    }

    request = factory.put(f"/blog/update/{post1.id}/", data)
    force_authenticate(request, user=user)

    response = update_post_api_view(request, post1.id)

    assert response.status_code == HTTP_403_FORBIDDEN

# Test - CRUD - Create post
@pytest.mark.django_db
def test_create_post_api_view(authenticated_request_factory):
    factory, user = authenticated_request_factory
    
    data = {
        "title": "Test Post",
        "body": "Test body content",
    }
    request = factory.post("/blog/create/", data)

    force_authenticate(request, user=user)
    response = create_post_api_view(request)

    assert response.status_code == HTTP_200_OK
    assert Post.objects.filter(title="Test Post").exists()

@pytest.mark.django_db
def test_create_post_bad_request(authenticated_request_factory):
    factory, user = authenticated_request_factory
    
    data = {

    }
    request = factory.post("/blog/create/", data)

    force_authenticate(request, user=user)
    response = create_post_api_view(request)

    assert response.status_code == HTTP_400_BAD_REQUEST


# Test - CRUD - Delete post
@pytest.mark.django_db    
def test_delete_post_api_view(authenticated_request_factory):
    factory, user = authenticated_request_factory

    new_profile = Profile.objects.get(user=user)
    post = Post.objects.create(title="Post 1", author=new_profile)

    request = factory.delete(f"/blog/delete/{post.id}/")

    force_authenticate(request, user=user)
    response = delete_post_api_view(request, post.id)

    assert response.status_code == HTTP_200_OK


@pytest.mark.django_db    
def test_delete_post_post_not_found(authenticated_request_factory):
    factory, user = authenticated_request_factory

    request = factory.delete(f"/blog/delete/999/")

    force_authenticate(request, user=user)
    response = delete_post_api_view(request, 999)

    assert response.status_code == HTTP_404_NOT_FOUND


@pytest.mark.django_db    
def test_delete_post_not_your_post(authenticated_request_factory, profile):
    factory, user = authenticated_request_factory

    post = Post.objects.create(title="Post 1", author=profile)

    request = factory.delete(f"/blog/delete/{post.id}/")

    force_authenticate(request, user=user)
    response = delete_post_api_view(request, post.id)

    assert response.status_code == HTTP_403_FORBIDDEN
