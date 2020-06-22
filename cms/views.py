from django import urls
from django.conf import settings
from django.http import HttpResponseRedirect
from django.utils import translation
from urllib.parse import urlparse
from wagtail.core.models import Site
from wagtailtrans.models import TranslatablePage, Language


def set_language_from_url(request, language_code):

    if not language_code in [lang[0] for lang in settings.LANGUAGES]:
        return HttpResponseRedirect('/')

    try:
        # get the full path of the referring page; go back if requested language equals current language
        previous = request.META['HTTP_REFERER']
        if language_code == translation.get_language():
            return HttpResponseRedirect(previous)

        try:
            # split off the path of the previous page
            prev_path = urlparse(previous).path
            # wagtailtrans prefixes the translatable root's url_path, so we need to do that as well
            prev_url_path = Site.find_for_request(request).root_page.url_path + prev_path[1:]
            prev_page = TranslatablePage.objects.get(url_path=prev_url_path)

            # if the current page has a canonical page, use that, otherwise the current page itself is canonical
            can_page = prev_page.canonical_page if prev_page.canonical_page else prev_page

            # if the requested language is the canonical (default) language, use the canonical page, else find the translated page
            language = Language.objects.get(code=language_code)
            next_url = can_page.url if language_code == settings.LANGUAGE_CODE else TranslatablePage.objects.get(language=language, canonical_page=can_page).url
        except (TranslatablePage.DoesNotExist, Language.DoesNotExist):
            # previous page is not a TranslatablePage, try if previous path can be translated by changing the language code
            next_url = urls.translate_url(previous, language_code)

            # if no translation is found, translate_url will return the original url
            # in that case, go to the home page in the requested language
            if next_url == previous:
                next_url = '/' + language_code + '/'

    except KeyError:
        # if for some reason the previous page cannot be found, go to the home page
        next_url = '/' + language_code +'/'

    translation.activate(language_code)
    response = HttpResponseRedirect(next_url)
    response.set_cookie(settings.LANGUAGE_COOKIE_NAME, language_code)
    return response