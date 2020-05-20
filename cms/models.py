from wagtail.admin.edit_handlers import FieldPanel
from wagtail.core.fields import RichTextField
from wagtailtrans.models import TranslatablePage

class HomePage(TranslatablePage):
    intro = RichTextField(blank=True)

    content_panels = TranslatablePage.content_panels + [
        FieldPanel('intro', classname='full'),
    ]
