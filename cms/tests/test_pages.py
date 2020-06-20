from .factories import HomePageFactory, ThemeFactory, ThemePageFactory, ArticlePageFactory, \
    ThemeIndexPageFactory, ArticleIndexPageFactory
from django.test import TestCase, RequestFactory
from wagtail.core.models import Page, Site


class TestPageModels(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.factory = RequestFactory()
        # Wagtail needs a site, e.g. to define url
        # Page.get_first_root_node() is used by Wagtail to find the root page
        cls.site = Site.objects.create(is_default_site=True, root_page=Page.get_first_root_node())
        cls.homepage = HomePageFactory()
        cls.articleindexpage = ArticleIndexPageFactory(parent=cls.homepage)
        cls.themeindexpage = ThemeIndexPageFactory(parent=cls.homepage)
        cls.theme1 = ThemeFactory()
        cls.theme2 = ThemeFactory()
        cls.themepage1 = ThemePageFactory(theme=cls.theme1, parent=cls.themeindexpage)
        cls.themepage2 = ThemePageFactory(theme=cls.theme2, parent=cls.themeindexpage)
        cls.articlepage1 = ArticlePageFactory(parent=cls.articleindexpage, themes=(cls.theme1, cls.theme2,), featured=True)
        cls.articlepage2 = ArticlePageFactory(parent=cls.articleindexpage, themes=(cls.theme1,))

    def test_articles_on_themepage_are_in_antichronological_order(self):
        articlepageslist = self.themepage1.articlepages()
        publisheddatelist = [articlepage.first_published_at for articlepage in articlepageslist]
        self.assertTrue(publisheddatelist == sorted(publisheddatelist, reverse=True))

    def test_articles_on_articleindexpage_are_in_antichronological_order(self):
        articlepageslist = self.articleindexpage.articlepages()
        publisheddatelist = [articlepage.first_published_at for articlepage in articlepageslist]
        self.assertTrue(publisheddatelist == sorted(publisheddatelist, reverse=True))

    def test_featured_articles_on_articleindexpage_get_set(self):
        self.assertEqual(len(self.articleindexpage.featured_articlepages()), 1)

    def test_themepages_of_articlepage(self):
        themepageslist = self.articlepage1.themepages()
        self.assertEqual(len(themepageslist), 2)
        self.assertEqual(themepageslist[0].url, self.themepage1.url)

    def test_get_absolute_url_of_article_page(self):
        self.assertEqual(self.articlepage1.get_absolute_url(), self.articlepage1.url)

    def test_article_page_is_served(self):
        # first create get request to page (serve method needs it)
        request = self.factory.get(self.articlepage1.url)
        # page serve method will return TemplateResponse object (but with only HttpResponse attributes, due to limitations of RequestFactory)
        response = self.articlepage1.serve(request)
        # this will have status code 200, if the page exists
        self.assertEqual(response.status_code, 200)
