from django.urls import path

from .views import *


urlpatterns = [
    path("all/", ListAllPropertiesAPIView.as_view(), name="all-properties"),
    path("agents/", ListAgentsPropertyAPIView.as_view(), name="agents-properties"),
    path("create/", create_property_api_view, name="property-create"),
    path("details/<slug:slug>/", PropertyDetailAPIView.as_view(), name="property-details"),
    path("update/<slug:slug>/", update_property_api_view, name="update-property"),
    path("delete/<slug:slug>/", delete_property_api_view, name="delete-property"),
    path("search/", PropertySearchAPIView.as_view(), name="property-search"),
]
