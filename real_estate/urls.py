from django.contrib import admin
from django.urls import include, path

from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


urlpatterns = [
    path("admin/", admin.site.urls),

    # JWT auth
    path("api/v1/auth/", include("djoser.urls")),
    path("api/v1/auth/", include("djoser.urls.jwt")),  
    
    # Auth with Google, Facebook ...
    path("api/v1/social-auth/", include("apps.social_auth.urls")),
    
    path("api/v1/profile/", include("apps.profiles.urls")),

    path("api/v1/properties/", include("apps.properties.urls")),

    path("api/v1/ratings/", include("apps.ratings.urls")),
    
    path("api/v1/enquiries/", include("apps.enquiries.urls")),

    path("api/v1/blog/", include("apps.blog.urls")),

    # Swagger endpoints
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'), 

]

admin.site.site_header = "Real Estate Admin"
admin.site.site_title = "Real Estate Admin Portal"
admin.site.index_title = "Welcome to the Real Estate Admin Portal"
