from .models import Theme, MenuItem, Menu
from django.contrib import admin
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline


class ThemeAdmin(TranslationAdmin):
    model = Theme


class MenuItemInline(TranslationTabularInline):
    model = MenuItem


class MenuAdmin(TranslationAdmin):
    model = Menu
    inlines = [MenuItemInline,]


admin.site.register(Theme, ThemeAdmin)
admin.site.register(Menu, MenuAdmin)
