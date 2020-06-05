from .models import Theme, MenuItem, Menu
from modeltranslation.translator import register, TranslationOptions


@register(Theme)
class ThemeTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(MenuItem)
class MenuItemTranslationOptions(TranslationOptions):
    fields = ('title',)


@register(Menu)
class MenuTranslationOptions(TranslationOptions):
    fields = ('title',)
