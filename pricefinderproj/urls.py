"""pricefinderproj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt import views as jwt_views

from pricefinderapp import views

from rest_framework import routers

router = routers.DefaultRouter()

router.register(r"customers", views.CustomerViewSet, basename="Customer")
router.register(r"retailers", views.RetailerViewSet, basename="Retailer")
router.register(r"products", views.ProductViewSet, basename="Product")
router.register(r"categories", views.CategoryViewSet, basename="Category")
# router.register(r"login", views.LoginView, basename="Login")
# router.register(r"logout", views.LogoutView, basename="Logout")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    path("",include("pricefinderapp.urls")),
]
