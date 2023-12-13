from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy


class CustomUserManager(BaseUserManager):
    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(gettext_lazy("A valid email adress should be provided!"))
        

    def create_user(self, username, first_name, last_name,
                    email, password, **extra_fields):
        
        if not username:
            raise ValueError(gettext_lazy("User must submit a username!"))    
        if not first_name:
            raise ValueError(gettext_lazy("The user must submit the first name!"))
        if not last_name:
            raise ValueError(gettext_lazy("The user must submit the last name!"))
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(gettext_lazy("Base user account: An email adress is required!")) 

        user = self.model(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
            **extra_fields,
        )  

        user.set_password(password)
        extra_fields.setdefault("isSuperuser", False)
        extra_fields.setdefault("isStaff", False)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, username, first_name, last_name,
                    email, password, **extra_fields):
        
        extra_fields.setdefault("isStaff", True)
        extra_fields.setdefault("isSuperuser", True)
        extra_fields.setdefault("isActive", True)

        if extra_fields.get("isStaff") is not True:
            raise ValueError(gettext_lazy("Superuser must have isStaff == True"))
        
        if extra_fields.get("isSuperuser") is not True:
            raise ValueError(gettext_lazy("Superuser must have isSuperuser == True"))
        
        if not password:
            raise ValueError(gettext_lazy("Superuser must have a password"))
        
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(gettext_lazy("Admin account: An email adress is required!"))
        
        user = self.create_user(username, first_name, last_name, email, password,
                                 **extra_fields)
        user.save(using=self._db)

        return user
        