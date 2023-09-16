from django.shortcuts import render, redirect


def index(request):
    if request.user.is_authenticated:
        return redirect("post:main")
    else:
        return redirect("accounts:login")
