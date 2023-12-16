from django.urls import path
from .views import *


urlpatterns = [
    path("<str:profile_id>/", create_agent_review, name="create-rating"),
]