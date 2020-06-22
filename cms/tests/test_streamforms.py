from django.test import TestCase
from ..wagtailstreamforms_fields import ReCaptchaField
from wagtailstreamforms.models import Form
import json
from ..models import AdvancedFormSetting
from django.core.files.uploadedfile import SimpleUploadedFile
from django.http import QueryDict
from ..wagtailstreamforms_hooks import email_submission
from django.core import mail


class TestWagtailStreamforms(TestCase):

    def test_recaptcha_field(self):
        field = ReCaptchaField().get_formfield({})
        self.assertTrue(field.required)

    def test_form(self):
        form = Form.objects.create(
            title="Form",
            template_name="streamforms/form_block.html",
            slug="form",
            fields=json.dumps(
                [
                    {
                        "type": "singleline",
                        "value": {"label": "singleline", "required": True},
                        "id": "9c46e208-e53a-4562-81f6-3fb3f34520f2",
                    },
                    {
                        "type": "multifile",
                        "value": {"label": "multifile", "required": True},
                        "id": "91bac05f-754b-41a3-b038-ac7850e6f951",
                    },
                ]
            ),
        )
        return form

    def test_send_email(self):
        instance = self.test_form()

        advancedformsetting = AdvancedFormSetting.objects.create(form=instance, to_address="mail@example.com")
        data_dict = {
            "singleline": 'text',
            "form_id": instance.pk,
            "form_reference": "some-ref",
        }
        uploadedfile = SimpleUploadedFile("file.mp4", b"file_content", content_type="video/mp4")
        files_dict = QueryDict(mutable=True)
        files_dict.update({"multifile": uploadedfile})
        files_dict.update({"multifile": uploadedfile})

        form_class = instance.get_form(data=data_dict, files=files_dict)

        assert form_class.is_valid()

        # Send message.
        email_submission(instance, form_class)

        # Test that one message has been sent.
        self.assertEqual(len(mail.outbox), 1)

        # Verify that the subject of the first message is correct.
        expected_subject = 'New Form Submission : %s' % instance.title
        self.assertEqual(mail.outbox[0].subject, expected_subject)
