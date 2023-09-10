from django.urls import path

from . import views

urlpatterns = [
    path("dummyresponse/", views.dummyresponse, name="dummyresponse"),
]