from .blocks import InlineImageBlock, InlineVideoBlock
from django import forms
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from django_extensions.db.fields import AutoSlugField
from modelcluster.fields import ParentalManyToManyField, ParentalKey
from modelcluster.models import ClusterableModel
from wagtail.core import blocks
from wagtail.core.models import Orderable
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel, MultiFieldPanel, PageChooserPanel, InlinePanel
from wagtail.core.fields import RichTextField, StreamField
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.snippets.models import register_snippet
from wagtailcodeblock.blocks import CodeBlock
from wagtailtrans.models import TranslatablePage

class HomePage(TranslatablePage):
    intro = RichTextField(blank=True)
    theme_section_title = models.CharField(
        null=True,
        blank=True,
        max_length=255,
        help_text=_("Title to display above the theme section"),
    )
    theme_section_intro = RichTextField(blank=True)
    theme_section = models.ForeignKey(
        TranslatablePage,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text=_("Featured section for the homepage. Will display all themes."),
        verbose_name=_("Theme section"),
    )
    article_section_title = models.CharField(
        null=True,
        blank=True,
        max_length=255,
        help_text=_("Title to display above the article section"),
    )
    article_section_intro = RichTextField(blank=True)
    article_section = models.ForeignKey(
        TranslatablePage,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text=_("Featured articles for the homepage"),
        verbose_name=_("Article section"),
    )

    content_panels = TranslatablePage.content_panels + [
        FieldPanel('intro', classname='full'),
        MultiFieldPanel([
            FieldPanel('theme_section_title'),
            FieldPanel('theme_section_intro', classname='full'),
            PageChooserPanel('theme_section'),
            ], heading='Theme section', classname='collapsible'),
        MultiFieldPanel([
            FieldPanel('article_section_title'),
            FieldPanel('article_section_intro', classname='full'),
            PageChooserPanel('article_section'),
            ], heading=_("Article section"), classname='collapsible'),
    ]


@register_snippet
class Theme(models.Model):
    name = models.CharField(max_length=255)

    panels = [
        FieldPanel('name'),
    ]

    def __str__(self):
        return self.name


class ThemePage(TranslatablePage):
    theme = models.ForeignKey(Theme, on_delete=models.SET_NULL, null=True, related_name='themepages')
    intro = RichTextField(blank=True)
    image = models.ForeignKey(
        'wagtailimages.Image', blank=True, null=True, on_delete=models.SET_NULL, related_name='+'
    )
    caption = models.CharField(blank=True, null=True, max_length=255)

    def articlepages(self):
        return self.theme.articlepages.filter(language=self.language).live().order_by('-first_published_at')

    content_panels = TranslatablePage.content_panels + [
        SnippetChooserPanel('theme'),
        FieldPanel('intro', classname='full'),
        ImageChooserPanel('image'),
        FieldPanel('caption'),
    ]


class ArticlePage(TranslatablePage):
    intro = RichTextField(blank=True)
    image = models.ForeignKey(
        'wagtailimages.Image', blank=True, null=True, on_delete=models.SET_NULL, related_name='+', verbose_name=_("Image")
    )
    themes = ParentalManyToManyField(Theme, blank=True, related_name='articlepages', verbose_name=_("Themes"))
    featured = models.BooleanField(default=False)
    body = StreamField([
        ('paragraph', blocks.RichTextBlock(features=['h1', 'h2', 'h3', 'h4', 'h5', 'bold', 'italic', 'ol', 'ul', 'hr', 'link', 'image', 'code', 'blockquote'])),
        ('code', CodeBlock(label=_("Code"))),
        ('image', InlineImageBlock()),
        ('video', InlineVideoBlock()),
    ])

    def themepages(self):
        return ThemePage.objects.filter(theme__in=self.themes.all(), language=self.language)

    content_panels = TranslatablePage.content_panels + [
        FieldPanel('intro'),
        FieldPanel('themes', widget=forms.CheckboxSelectMultiple),
        FieldPanel('featured'),
        ImageChooserPanel('image'),
        StreamFieldPanel('body'),
    ]


class ThemeIndexPage(TranslatablePage):
    intro = RichTextField(blank=True)

    # Specifies that only ThemePage objects can live under this index page
    subpage_types = ['ThemePage']

    content_panels = TranslatablePage.content_panels + [
        FieldPanel('intro', classname='full'),
    ]


class ArticleIndexPage(TranslatablePage):
    intro = RichTextField(blank=True)

    # Specifies that only ArticlePage objects can live under this index page
    subpage_types = ['ArticlePage']

    # A method to access and reorder the children of the page (i.e. ArticlePage objects)
    def articlepages(self):
        return ArticlePage.objects.child_of(self).live().order_by('-first_published_at')

    def featured_articlepages(self):
        return self.articlepages().filter(featured=True)

    content_panels = TranslatablePage.content_panels + [
        FieldPanel('intro', classname='full'),
    ]


class MenuItem(Orderable):
    menu = ParentalKey('Menu', related_name='menu_items', help_text=_("Name of the menu to which this item belongs"))
    title = models.CharField(max_length=50, help_text=_("Title of menu item that will be displayed"))
    link_url = models.CharField(max_length=500, blank=True, null=True, help_text=_("URL to link to, e.g. /accounts/signup (no language prefix, LEAVE BLANK if you want to link to a page instead of a URL)"))
    link_page = models.ForeignKey(
        TranslatablePage, blank=True, null=True, related_name='+', on_delete=models.CASCADE, help_text=_("Page to link to (LEAVE BLANK if you want to link to a URL instead)"),
    )
    name_of_submenu = models.CharField(
        blank=True, null=True, max_length=50, help_text=_("Name of submenu (LEAVE BLANK if there is no custom submenu)")
    )
    icon = models.ForeignKey(
        'wagtailimages.Image', blank=True, null=True, on_delete=models.SET_NULL, related_name='+',
    )
    show_when = models.CharField(
        max_length=15,
        choices=[('always', _("Always")), ('logged_in', _("When logged in")), ('not_logged_in', _("When not logged in"))],
        default='always',
    )

    panels = [
        FieldPanel('title'),
        FieldPanel('link_url'),
        PageChooserPanel('link_page'),
        FieldPanel('name_of_submenu'),
        ImageChooserPanel('icon'),
        FieldPanel('show_when'),
    ]

    @property
    def slug(self):
        # becomes slug of submenu if there is one, otherwise slug of link_page
        if self.name_of_submenu:
            return slugify(self.name_of_submenu)
        elif self.link_page:
            return self.link_page.slug
        return None

    def __str__(self):
        return self.title


@register_snippet
class Menu(ClusterableModel):

    name = models.CharField(max_length=50)
    slug = AutoSlugField(populate_from='name', editable=True, help_text="Unique identifier of menu. Will be populated automatically from name of menu. Change only if needed.")

    panels = [
        MultiFieldPanel([
            FieldPanel('name'),
            FieldPanel('slug'),
        ], heading=_("Menu")),
        InlinePanel('menu_items', label=_("Menu Item"))
    ]

    def __str__(self):
        return self.name
