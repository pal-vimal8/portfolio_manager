# portfolio/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('portfolio-creation/', views.portfolio_creation, name='portfolio_creation'),
]
