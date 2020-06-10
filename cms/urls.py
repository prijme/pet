from django.urls import path
from .views import set_language_from_url

urlpatterns = [
    path('<str:language_code>/', set_language_from_url, name='set_language_from_url'),
]