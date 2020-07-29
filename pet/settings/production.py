from .base import *

DEBUG = False
ALLOWED_HOSTS = ['pythoneatstail.com', 'www.pythoneatstail.com',]

try:
    from .local import *
except ImportError:
    pass
