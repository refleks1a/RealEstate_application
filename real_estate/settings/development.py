from .base import *


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