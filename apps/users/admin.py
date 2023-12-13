from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy
from .forms import CustonUserChangeForm, CustonUserCreationForm
from .models import User


class UserAdmin(BaseUserAdmin):
    ordering = ["email"]
    add_form = CustonUserCreationForm
    form = CustonUserChangeForm
    model = User

    list_display = ["pkid", "id", "email", "username",
                     "first_name","last_name",
                       "is_staff", "is_active"]
    
    list_display_links = ["id", "email"]

    list_filter = ["email", "username", "first_name",
                    "last_name","is_staff", "is_active"]
    
    fieldsets = (
        (
            gettext_lazy("Login credentials"),
            {
                 "fields": ("email", "password",)
            },
        ),
        (
            gettext_lazy("Personal information"),
            {
                "fields": ("username", "first_name",
                            "last_name",)
            },
        ),
        (
            gettext_lazy("Permitions and groups"),
            {
                "fields": ("is_active", "is_staff",
                            "is_superuser", "groups",
                              "user_permissions",),
            },
        ),
        (
            gettext_lazy("Important dates"),
            {
                "fields": ("last_login", "date_joined",),
            },
        ),

    )
    add_fieldsets = (
        (None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2",
                        "isStaff", "isActive",),
            },
        ),
    )

    search_fields = ["email", "username", 
                     "first_name", "last_name"]

admin.site.register(User, UserAdmin)    