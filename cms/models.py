from .blocks import InlineImageBlock, InlineVideoBlock
from allauth.account.forms import LoginForm
from django import forms
from django.conf import settings
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
from wagtailtrans.models import TranslatablePage, Language
from django_comments_xtd.models import XtdComment
from wagtailstreamforms.blocks import WagtailFormBlock
from wagtailstreamforms.models.abstract import AbstractFormSetting

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

    def get_absolute_url(self):
        return self.get_url()

    def serve(self, request, *args, **kwargs):
        response = super().serve(request, 'cms/article_page.html')
        response.context_data['login_form'] = LoginForm()
        return response

    content_panels = TranslatablePage.content_panels + [
        FieldPanel('intro'),
        FieldPanel('themes', widget=forms.CheckboxSelectMultiple),
        FieldPanel('featured'),
        ImageChooserPanel('image'),
        StreamFieldPanel('body'),
        InlinePanel('customcomments', label=_("Comments")),
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


class TextPage(TranslatablePage):
    text = RichTextField(blank=True)

    content_panels = TranslatablePage.content_panels + [
        FieldPanel('text', classname='full'),
    ]


@register_snippet
class Menu(ClusterableModel):

    title = models.CharField(max_length=50)
    slug = AutoSlugField(populate_from='title', editable=True, help_text="Unique identifier of menu. Will be populated automatically from title of menu. Change only if needed.")

    panels = [
        MultiFieldPanel([
            FieldPanel('title'),
            FieldPanel('slug'),
        ], heading=_("Menu")),
        InlinePanel('menu_items', label=_("Menu Item"))
    ]

    def __str__(self):
        return self.title


class MenuItem(Orderable):
    menu = ParentalKey('Menu', related_name='menu_items', help_text=_("Menu to which this item belongs"))
    title = models.CharField(max_length=50, help_text=_("Title of menu item that will be displayed"))
    link_url = models.CharField(max_length=500, blank=True, null=True, help_text=_("URL to link to, e.g. /accounts/signup (no language prefix, LEAVE BLANK if you want to link to a page instead of a URL)"))
    link_page = models.ForeignKey(
        TranslatablePage, blank=True, null=True, related_name='+', on_delete=models.CASCADE, help_text=_("Page to link to (LEAVE BLANK if you want to link to a URL instead)"),
    )
    title_of_submenu = models.CharField(
        blank=True, null=True, max_length=50, help_text=_("Title of submenu (LEAVE BLANK if there is no custom submenu)")
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
        FieldPanel('title_of_submenu'),
        ImageChooserPanel('icon'),
        FieldPanel('show_when'),
    ]

    def trans_page(self, language_code):
        if self.link_page:
            can_page = self.link_page.canonical_page if self.link_page.canonical_page else self.link_page
            if language_code == settings.LANGUAGE_CODE: # requested language is the canonical language
                return can_page
            try:
                language = Language.objects.get(code=language_code)
            except Language.DoesNotExist: # no language found, return original page
                return self.link_page
            return TranslatablePage.objects.get(language=language, canonical_page=can_page)
        return None

    def trans_url(self, language_code):
        if self.link_url:
            return '/' + language_code + self.link_url
        elif self.link_page:
            return self.trans_page(language_code).url
        return None

    @property
    def slug_of_submenu(self):
        # becomes slug of submenu if there is one, otherwise None
        if self.title_of_submenu:
            return slugify(self.title_of_submenu)
        return None

    def show(self, authenticated):
        return ((self.show_when == 'always')
                or (self.show_when == 'logged_in' and authenticated)
                or (self.show_when == 'not_logged_in' and not authenticated))

    def __str__(self):
        return self.title


@register_snippet
class CompanyLogo(models.Model):
    name = models.CharField(max_length=250)
    logo = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.CASCADE, related_name='+'
    )

    panels = [
        FieldPanel('name', classname='full'),
        ImageChooserPanel('logo'),
    ]

    def __str__(self):
        return self.name


class CustomComment(XtdComment):
    page = ParentalKey(ArticlePage, on_delete=models.CASCADE, related_name='customcomments')

    def save(self, *args, **kwargs):
        if self.user:
            self.user_name = self.user.display_name
        self.page = ArticlePage.objects.get(pk=self.object_pk)
        super(CustomComment, self).save(*args, **kwargs)


class ContactPage(TranslatablePage):
    intro = RichTextField(blank=True)
    body = StreamField([
        ('paragraph', blocks.RichTextBlock()),
        ('form', WagtailFormBlock()),
    ])
    content_panels = TranslatablePage.content_panels + [
        FieldPanel('intro'),
        StreamFieldPanel('body'),
    ]


class AdvancedFormSetting(AbstractFormSetting):
    to_address = models.EmailField()
