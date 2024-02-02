from django.contrib import admin

from .models import Post, PostViews

class PostAdmin(admin.ModelAdmin):
    list_display = [
        "title", "body", "photo1", "photo2", "photo3", "publish_date", "published_status", "reference_code"
    ]
    list_filter = [
        "title", "publish_date", "published_status", "views"
    ]


admin.site.register(Post, PostAdmin)
admin.site.register(PostViews)
