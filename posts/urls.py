from django.urls import path
from . import views

app_name = 'posts'
urlpatterns = [
    path('main/', views.main, name='main'),
]