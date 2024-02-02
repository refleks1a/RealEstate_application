from django.urls import path

from .views import *


urlpatterns = [
    path("all/", PostsListAPIView.as_view(), name="all_posts"),
    path("details/<str:id>", PostDetailsAPIView.as_view(), name="post_details"),
    path("create/", create_post_api_view, name="create_post"),
    path("update/<str:id>", update_post_api_view, name="update_post"),
    path("delete/<str:id>", delete_post_api_view, name="delete_post"),
]
