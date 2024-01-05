from django.shortcuts import render, redirect


def index(request):
    if request.user.is_authenticated:
        return redirect("posts:main")
    else:
        return redirect("accounts:login")
