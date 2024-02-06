from django.contrib import admin

from .models import CustomSession


class CUstomSessionAdmin(admin.ModelAdmin):
    list_display = ["state", "application", "created_at", "id"]

    list_filter = ["application", "created_at", "id"]


admin.site.register(CustomSession, CUstomSessionAdmin)
