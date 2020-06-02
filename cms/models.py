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
