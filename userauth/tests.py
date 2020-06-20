from .forms import SignupForm
from .models import CustomUser
from .views import profile_view
from django.test import TestCase, RequestFactory

class TestCustomUser(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.factory = RequestFactory()
        cls.user = CustomUser.objects.create(username="userJohnDoe", password="secretpassword", first_name="John", last_name="Doe")
        cls.user2 = CustomUser.objects.create(username="undefined", password="undefined", first_name="undefined", last_name="undefined")

    def test_string_representation_of_customuser(self):
        expected_representation_customuser = "userJohnDoe: John Doe"
        self.assertEqual(expected_representation_customuser, str(self.user))

    def test_profile_view_with_user_gets_valid_response(self):
        request = self.factory.get(self.user.get_absolute_url())
        # log user in
        request.user = self.user
        self.assertEqual(profile_view(request).status_code, 200)

    def test_signup_form(self):
        form_data = {'first_name': "Jane", 'last_name': "Doe", 'display_name': "Jane Doe"}
        form = SignupForm(data=form_data)
        self.assertTrue(form.is_valid())
        form.signup(self, user=self.user2)
        self.assertEqual(self.user2.display_name, "Jane Doe")
