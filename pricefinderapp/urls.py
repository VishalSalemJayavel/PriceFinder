from django.urls import path

from . import views

urlpatterns = [
    path("testview/", views.TestView.as_view(), name="testview"),
    path("logout/", views.logout_view.as_view(), name="logout"),
    path("createuser/", views.CreateUserView.as_view(), name="createuser"),
]