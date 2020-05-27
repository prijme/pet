from django.utils.translation import gettext_lazy as _
from wagtail.core import blocks
from wagtail.core.blocks import CharBlock
from wagtail.images.blocks import ImageChooserBlock


class InlineImageBlock(blocks.StructBlock):
    image = ImageChooserBlock(label=_("Image"))
    caption = CharBlock(required=False, label=_("Caption"))
    float = blocks.ChoiceBlock(
        required=False,
        choices=[('right', _("Right")), ('left', _("Left")), ('center', _("Center"))],
        default='right',
        label=_("Float"),
    )
    size = blocks.ChoiceBlock(
        required=False,
        choices=[('small', _("Small")), ('medium', _("Medium")), ('large', _("Large"))],
        default='small',
        label=_("Size"),
    )

    class Meta:
        icon = 'image'
