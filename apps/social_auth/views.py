from django import forms
from django.contrib.auth import login
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views import View

from .service import (
    GoogleRawLoginFlowService,
)

from apps.users.models import User
from .models import CustomSession

import environ


env = environ.Env(DEBUG=(bool,False))


class GoogleLoginRedirectApi(View):
    def get(self, request, *args, **kwargs):
        google_login_flow = GoogleRawLoginFlowService()

        authorization_url, state = google_login_flow.get_authorization_url()

        CustomSession.objects.create(state=state, application="GOOGLE")

        return redirect(authorization_url)


class GoogleLoginApi(View):
    class InputValidationForm(forms.Form):
        code = forms.CharField(required=False)
        error = forms.CharField(required=False)
        state = forms.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_form = self.InputValidationForm(data=request.GET)

        if not input_form.is_valid():
            return

        validated_data = input_form.cleaned_data

        code = validated_data["code"] if validated_data.get("code") != "" else None
        error = validated_data["error"] if validated_data.get("error") != "" else None
        state = validated_data["state"] if validated_data.get("state") != "" else None

        if error is not None:
            return JsonResponse({"error": error}, status=400)

        if code is None or state is None:
            return JsonResponse({"error": "Code and state are required."}, status=400)

        session_state = CustomSession.objects.last()

        if session_state is None:
            return JsonResponse({"error": "CSRF check failed."}, status=400)

        if state != session_state:
            return JsonResponse({"error": "CSRF check failed."}, status=400)
        
        session_state.delete()

        google_login_flow = GoogleRawLoginFlowService()

        google_tokens = google_login_flow.get_tokens(code=code)

        id_token_decoded = google_tokens.decode_id_token()
        user_info = google_login_flow.get_user_info(google_tokens=google_tokens)

        user_email = id_token_decoded["email"]
        
        request_user_list = User.objects.filter(email=user_email)
        user = request_user_list.get(email=user_email) if request_user_list else None

        if user is None:            
            return JsonResponse({"error": f"User with email {user_email} is not found."}, status=404)

        login(request, user)

        result = {
            "id_token_decoded": id_token_decoded,
            "user_info": user_info,
        }

        return JsonResponse(result, status=200)
    