from django.urls import path
from . import views

app_name = "accounts"
urlpatterns = [
    path("login/", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("signup/", views.signup, name="signup"),
    path("update/", views.update, name="update"),
    path("delete/", views.delete, name="delete"),
    path("password_change/", views.password_change, name="password_change"),
    path("follow/<int:user_pk>/", views.follow, name="follow"),
    path("mypage/", views.mypage, name="mypage"),
    path('search_friends/<str:search_query>/', views.search_friends, name='search_friends'),
]
