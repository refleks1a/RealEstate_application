from django.urls import path

from .views import (AgentListAPIView, GetProfileAPIView, TopAgentsListAPIView,
                    UpdateProfileAPIView, GetUserProfile)


urlpatterns = [
    path("me/", GetProfileAPIView.as_view(), name = "get_profile"),
    path("update/<str:username>/", UpdateProfileAPIView.as_view(), name = "update_profile"),

    path("<str:id>/", GetUserProfile.as_view(), name="user_profile"),
    
    path("agents/all/", AgentListAPIView.as_view(), name = "all-agents"),
    path("top-agents/all/", TopAgentsListAPIView.as_view(), name = "top-agents")
]
