from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

# Register your models here.
class CustomUserAdmin(UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = CustomUser
    list_display = ['pk', 'email', 'display_name', 'first_name', 'last_name']
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('email', 'first_name', 'last_name', 'display_name', 'date_of_birth', 'address1', 'address2', 'zip_code', 'city', 'country', 'mobile_phone', 'additional_information', 'photo',)}),
    )
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('display_name', 'date_of_birth', 'address1', 'address2', 'zip_code', 'city', 'country', 'mobile_phone', 'additional_information', 'photo',)}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
