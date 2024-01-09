from django.urls import path
from . import views

app_name = "posts"
urlpatterns = [
    path("main/", views.main, name="main"),
    path("create/<str:post_date>/", views.create, name="create"),
    path("check_post/<str:post_date>/", views.check_post, name="check_post"),
    path("detail/<str:post_date>/", views.detail, name="detail"),
]
