from django.urls import path
from . import views

app_name = "posts"
urlpatterns = [
    path("main/", views.main, name="main"),
    path("create/<str:post_date>/", views.create, name="create"),
    path("check_post/<str:post_date>/", views.check_post, name="check_post"),
    path("detail/<int:user_pk>/<str:post_date>/", views.detail, name="detail"),
    path("comment_create/<int:post_pk>/", views.comment_create, name="comment_create"),
    path("update/<int:post_pk>/", views.update, name="update"),
    path("delete/<int:post_pk>/", views.delete, name="delete"),
]
