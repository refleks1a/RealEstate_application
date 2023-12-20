from django.urls import path

from .views import *


urlpatterns = [
    path('', send_enquiry_email, name="send-enquiry"),
]
