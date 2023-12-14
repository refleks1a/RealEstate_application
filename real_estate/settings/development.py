from .base import *


EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_USE_TLS = True
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = "info@real-estate.com"
DOMAIN = env("DOMAIN")
SITE_NAME = "Real Estate"

DATABASES = {
    "default": {
        "ENGINE": env("MYSQL_DB_ENGINE"),
        "NAME": env("MYSQL_DB"),
        "USER": env("MYSQL_DB_USER"),
        "PASSWORD": env("MYSQL_DB_PASSWORD"),
        "HOST": env("MYSQL_DB_HOST"),
        "PORT": env("MYSQL_DB_PORT"),
        'OPTIONS': {  
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"  
        },
    }
}

