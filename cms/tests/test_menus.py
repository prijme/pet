from django.test import TestCase
from .factories import HomePageFactory, ArticlePageFactory, ArticleIndexPageFactory, MenuFactory, MenuItemFactory
from wagtail.core.models import Page, Site
from ..templatetags.cms_tags import get_menu
from django.utils import translation
from django.conf import settings
from wagtailtrans.models import Language, TranslatablePage


class TestMenus(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.site = Site.objects.create(is_default_site=True, root_page=Page.get_first_root_node())
        cls.homepage = HomePageFactory()
        cls.articleindexpage = ArticleIndexPageFactory(parent=cls.homepage)
        cls.articlepage1 = ArticlePageFactory(parent=cls.articleindexpage, show_in_menus=True)
        cls.articlepage2 = ArticlePageFactory(parent=cls.articleindexpage, show_in_menus=True)
        cls.menu = MenuFactory()
        # for the menu-items we need to establish a sort order (class Orderable)
        cls.menuitem_ordinary = MenuItemFactory(menu=cls.menu, sort_order=1, title="Ordinary",
                                                link_url='/ordinary/', show_when='always')
        cls.menuitem_guest = MenuItemFactory(menu=cls.menu, sort_order=2, title="Guest", link_url='/guest/',
                                             show_when='not_logged_in')
        cls.menuitem_articlepage1 = MenuItemFactory(menu=cls.menu, sort_order=3, link_page=cls.articlepage1)
        # switch on a second language
        cls.foreign_language_code = [code for code, lang in settings.LANGUAGES if code != settings.LANGUAGE_CODE][0]
        cls.foreign_language = Language.objects.get_or_create(code=cls.foreign_language_code)[0]
        # note: Wagtailtrans automatically creates a language tree for every language that is defined
        cls.foreign_articlepage1 = TranslatablePage.objects.get(language=cls.foreign_language,
                                                                canonical_page=cls.articlepage1)

    def test_get_menu_of_page(self):
        menu = get_menu(slug=None, page=self.articleindexpage, logged_in=True)
        self.assertEqual(menu[0]['title'], self.articlepage1.title)
        self.assertEqual(menu[0]['url'], self.articlepage1.url)
        self.assertEqual(menu[0]['page'].title, self.articlepage1.title)
        self.assertEqual(len(menu), 2)

    def test_get_handmade_menu(self):
        menu = get_menu(self.menu.slug, None, True)
        self.assertEqual(menu[0]['title'], 'Ordinary')
        # the expected url is in the current language
        expected_url = '/' + translation.get_language() + '/ordinary/'
        self.assertEqual(menu[0]['url'], expected_url)

    def test_get_menu_logged_in_or_not(self):
        menu = get_menu(self.menu.slug, None, True)
        # menu should only have two items
        self.assertEqual(len(menu), 2)
        menu = get_menu(self.menu.slug, None, False)
        self.assertEqual(len(menu), 3)

    def test_menuitem_trans_page_for_foreign_language(self):
        self.assertEqual(self.menuitem_articlepage1.trans_page(self.foreign_language_code).url,
                         self.foreign_articlepage1.url)

    def test_menuitem_trans_page_for_canonical_language(self):
        self.assertEqual(self.menuitem_articlepage1.trans_page(settings.LANGUAGE_CODE).url, self.articlepage1.url)

    def test_menuitem_trans_url_method(self):
        self.assertEqual(self.menuitem_articlepage1.trans_url(self.foreign_language_code),
                         self.foreign_articlepage1.url)
