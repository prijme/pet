from cms.models import Menu, CompanyLogo
from django import template
from django.utils import translation

register = template.Library()

@register.simple_tag()
def get_menu(slug, page, logged_in):
    # returns a list of dicts with title, url, slug, page and icon of all items in the menu of the given slug or page

    try:
        # see if there is a custom menu defined for the slug of the item
        candidates = Menu.objects.get(slug=slug).menu_items.all()
        language_code = translation.get_language()

        # create a list of all items that should be shown in the menu depending on logged_in
        menu_items = []
        for candidate in candidates:
            if candidate.show(logged_in):
                menu_items.append({'title': candidate.title, 'url': candidate.trans_url(language_code),
                                   'slug': candidate.slug_of_submenu, 'page': candidate.trans_page(language_code), 'icon': candidate.icon})
        return menu_items
    except Menu.DoesNotExist:
        pass
    try:
        # if there is no custom menu, then there should be a valid page argument; see if it has children
        candidates = page.get_children()

        # if so, create a list of all items that have show_in_menus == True
        menu_items = []
        for candidate in candidates:
            if candidate.show_in_menus:
                menu_items.append({'title': candidate.title, 'url': candidate.url,
                                   'slug': None, 'page': candidate, 'icon': None})
        return menu_items
    except AttributeError:
        # neither custom menu nor valid page argument; return None
        return None


@register.simple_tag()
def company_logo():
    return CompanyLogo.objects.first()
