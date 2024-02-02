from rest_framework.exceptions import APIException


class PostNotFound(APIException):
    status_code = 404
    default_detail = "The requested post doesn't exist..."
    