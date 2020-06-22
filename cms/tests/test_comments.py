from django.test import TestCase
from .factories import HomePageFactory, ArticlePageFactory, ArticleIndexPageFactory, CustomUserFactory, CustomCommentFactory
from wagtail.core.models import Page, Site


class TestComments(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.site = Site.objects.create(is_default_site=True, root_page=Page.get_first_root_node())
        cls.homepage = HomePageFactory()
        cls.articleindexpage = ArticleIndexPageFactory(parent=cls.homepage)
        cls.articlepage1 = ArticlePageFactory(parent=cls.articleindexpage)
        cls.user = CustomUserFactory(email="johndoe@example.com", display_name="John")
        cls.customcomment = CustomCommentFactory(object_pk=str(cls.articlepage1.pk), user=cls.user)

    def test_custom_comment_gets_saved_correctly(self):
        self.assertEqual(self.customcomment.page.url, self.articlepage1.url)
        self.assertEqual(self.customcomment.user_name, self.user.display_name)
