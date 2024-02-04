from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/v1/auth/", include("djoser.urls")),
    path("api/v1/auth/", include("djoser.urls.jwt")),
    path("api/v1/social-auth/", include("apps.social_auth.urls")),

    path("api/v1/profile/", include("apps.profiles.urls")),

    path("api/v1/properties/", include("apps.properties.urls")),

    path("api/v1/ratings/", include("apps.ratings.urls")),
    
    path("api/v1/enquiries/", include("apps.enquiries.urls")),

    path("api/v1/blog/", include("apps.blog.urls"))
]

admin.site.site_header = "Real Estate Admin"
admin.site.site_title = "Real Estate Admin Portal"
admin.site.index_title = "Welcome to the Real Estate Admin Portal"
