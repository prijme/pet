from captcha.fields import ReCaptchaField
from wagtail.core import blocks
from wagtailstreamforms.fields import BaseField, register
from django.utils.translation import gettext_lazy as _

@register('recaptcha')
class ReCaptchaField(BaseField):
    field_class = ReCaptchaField
    icon = 'success'
    label = _("ReCaptcha field")

    def get_options(self, block_value):
         options = super().get_options(block_value)
         options.update({
             'required': True
         })
         return options

    def get_form_block(self):
        return blocks.StructBlock([
            ('label', blocks.CharBlock()),
            ('help_text', blocks.CharBlock(required=False)),
        ], icon=self.icon, label=self.label)