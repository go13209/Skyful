from django.shortcuts import render, redirect
from posts.models import Post
from .forms import (
    CustomAuthenticationForm,
    CustomUserCreationForm,
    CustomUserChangeForm,
    CustomPasswordChangeForm,
)
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model


def login(request):
    if request.method == "POST":
        form = CustomAuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            return redirect("posts:main")
    else:
        form = CustomAuthenticationForm()
    context = {
        "form": form,
    }
    return render(request, "accounts/login.html", context)


@login_required
def logout(request):
    auth_logout(request)
    return redirect("index")


def signup(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect("posts:main")
    else:
        form = CustomUserCreationForm()
    context = {
        "form": form,
    }
    return render(request, "accounts/signup.html", context)


@login_required
def update(request):
    if request.method == "POST":
        form = CustomUserChangeForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect("posts:main")
    else:
        form = CustomUserChangeForm(instance=request.user)
    context = {
        "form": form,
    }
    return render(request, "accounts/update.html", context)


@login_required
def delete(request):
    request.user.delete()
    auth_logout(request)
    return redirect("index")


@login_required
def password_change(request):
    if request.method == "POST":
        form = CustomPasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            redirect("posts:main")
    else:
        form = CustomPasswordChangeForm(request.user)
    context = {
        "form": form,
    }
    return render(request, "accounts/password_change.html", context)


@login_required
def follow(request, user_pk):
    User = get_user_model()
    person = User.objects.get(pk=user_pk)

    if person != request.user:
        if request.user in person.followers.all():
            person.followers.remove(request.user)
        else:
            person.followers.add(request.user)
        return redirect("accounts:mypage")

    return redirect("posts:main")


@login_required
def mypage(request):
    User = get_user_model()
    person = User.objects.get(pk=request.user.pk)
    followings = person.followings.all()
    followers = person.followers.all()    
    shared_posts_by_me = Post.objects.filter(user=person, shared_with__isnull=False).order_by("-date")
    shared_posts_to_me = person.shared_posts.all().order_by("-date")

    context = {
        "person": person,
        "followings": followings,
        "followers": followers,
        "shared_posts_by_me": shared_posts_by_me,
        "shared_posts_to_me": shared_posts_to_me,
    }
    return render(request, "accounts/mypage.html", context)
