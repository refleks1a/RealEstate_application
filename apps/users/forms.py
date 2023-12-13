from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User


class CustonUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields =  ["email", "username", "first_name", "last_name"]
        error_class = "error"


class CustonUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = User
        fields =  ["email", "username", "first_name", "last_name"]
        error_class = "error"
        


