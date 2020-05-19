from django import forms
from django.utils.translation import gettext_lazy as _
from .models import CustomUser

from wagtail.users.forms import UserCreationForm, UserEditForm


class WagtailUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        widgets = {'date_of_birth': forms.DateInput(attrs={'type':'date'})}


class WagtailUserEditForm(UserEditForm):
    class Meta(UserEditForm.Meta):
        model = CustomUser
        widgets = {'date_of_birth': forms.DateInput(attrs={'type':'date'})}


class SignupForm(forms.Form):
    first_name = forms.CharField(max_length=30, label=_("First name"))
    last_name = forms.CharField(max_length=30, label=_("Last name"))
    display_name = forms.CharField(max_length=30, label=_("Display name"), help_text=_("Will be shown e.g. when commenting"))

    def signup(self, request, user):
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.display_name = self.cleaned_data['display_name']
        user.save()


class CustomUserUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'display_name', 'date_of_birth', 'address1', 'address2', 'zip_code', 'city', 'country', 'mobile_phone', 'additional_information', 'photo',]
        widgets = {'date_of_birth': forms.DateInput(attrs={'type':'date'})}