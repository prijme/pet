import factory
from ..models import Theme, HomePage, ThemePage, ThemeIndexPage, ArticleIndexPage, ArticlePage
from wagtail.core.models import Page
from datetime import timedelta
from django.utils import timezone


class ThemeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Theme

    name = factory.Sequence(lambda n: 'Theme number {0}'.format(n))


# first create page factory: see docs https://factoryboy.readthedocs.io/en/latest/reference.html#attributes-and-methods
class PageFactory(factory.django.DjangoModelFactory):
    class Meta:
        abstract = True

    # override the _create method, to establish parent-child relationship between pages
    @classmethod
    def _create(cls, model_class, *args, **kwargs):

        try:
            parent = kwargs.pop('parent')
        except KeyError:
            # no parent, appending page to root
            parent = Page.get_first_root_node()

        page = model_class(*args, **kwargs)
        parent.add_child(instance=page)

        return page

# setup: article indexpage has children article pages, article pages have foreign key to theme pages

class HomePageFactory(PageFactory):
    class Meta:
        model = HomePage

    title = factory.Sequence(lambda n: 'Home page {0}'.format(n))


class ThemePageFactory(PageFactory):
    class Meta:
        model = ThemePage

    title = factory.Sequence(lambda n: 'Theme page number {0}'.format(n))


class ThemeIndexPageFactory(PageFactory):
    class Meta:
        model = ThemeIndexPage

    title = factory.Sequence(lambda n: 'Theme index page number {0}'.format(n))


class ArticleIndexPageFactory(PageFactory):
    class Meta:
        model = ArticleIndexPage

    title = factory.Sequence(lambda n: 'Article index page number {0}'.format(n))


class ArticlePageFactory(PageFactory):
    class Meta:
        model = ArticlePage

    title = factory.Sequence(lambda n: 'Article on subject number {0}'.format(n))
    first_published_at = factory.Sequence(lambda n: timezone.now() - timedelta(days=365-n))

    # many-to-many-relationship have to be established
    # this is achieved by a post-generation function, see docs https://factoryboy.readthedocs.io/en/latest/recipes.html#simple-many-to-many-relationship

    @factory.post_generation
    def themes(self, create, extracted, **kwargs):
        if not create:
            # Simple build, do nothing.
            return

        if extracted:
            for theme in extracted:
                self.themes.add(theme)
