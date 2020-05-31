from django import template
from django.utils import translation
from wagtailtrans.models import TranslatablePage, Language

from cms.models import Menu

register = template.Library()

@register.simple_tag()
def get_menu(slug, logged_in):
    # returns a list of dicts with title, url, slug and (if present) icon of all items in the menu of the given slug
    language_code = translation.get_language()

    try:
        # see if there is a custom menu defined for the slug of the item
        candidates = Menu.objects.get(slug=slug).menu_items.all()

        # create a list of all items that should be shown in the menu depending on logged_in
        # skip items that neither have link_url nor link_page
        menu_items = []
        for candidate in candidates:
            if (((candidate.show_when == 'always')
                or (candidate.show_when == 'logged_in' and logged_in)
                or (candidate.show_when == 'not_logged_in' and not logged_in))
                    and (candidate.link_url or candidate.link_page)):
                item = {}
                if candidate.link_url:
                    # prefix current language code
                    url = '/' + language_code + candidate.link_url
                    item.update({'title': candidate.title, 'url': url, 'slug': candidate.slug})

                elif candidate.link_page:
                    # get the translated page in the current language
                    try:
                        language = Language.objects.get(code=language_code)

                        # if the linked page is not canonical, get the canonical page, and from that get the translated page
                        can_page = candidate.link_page if candidate.link_page.is_canonical else candidate.link_page.canonical_page
                        trans_page = TranslatablePage.objects.get(language=language, canonical_page=can_page)
                    except (Language.DoesNotExist, TranslatablePage.DoesNotExist):
                        # if for any reason the translated page cannot be found, use link_page
                        trans_page = candidate.link_page

                    item.update({'title': candidate.title, 'url': trans_page.url, 'slug': trans_page.slug})

                # add an icon if there is one
                if candidate.icon:
                    item.update({'icon': candidate.icon})
                menu_items.append(item)
        return menu_items
    except Menu.DoesNotExist:
        pass
    try:
        # if there is no custom menu, then the slug should belong to an existing page; see if it has children
        candidates = TranslatablePage.objects.get(slug=slug).get_children()

        # if so, create a list of all items that have show_in_menus == True
        menu_items = []
        for candidate in candidates:
            if candidate.show_in_menus:
                menu_items.append({'title': candidate.title, 'url': candidate.url, 'slug': candidate.slug})
        return menu_items
    except TranslatablePage.DoesNotExist:
        # slug neither belongs to custom menu nor to an existing page; return None
        return None
