from django.urls import path, include
from .views import *



urlpatterns = [
    path("mybookmarks/", MyBookmarkViewSet.as_view()),
    path('auth/user/', LoadUserAPI.as_view()),
    path("auth/login/", LoginAPI.as_view()),
    path('auth/register/', RegistrationAPI.as_view()),
]
