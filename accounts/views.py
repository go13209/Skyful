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
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, authenticate
from django.http import JsonResponse
from django.contrib import messages
from django.db.models import Q


def login(request):
    if request.user.is_authenticated:
        return redirect("posts:main")

    if request.method == "POST":
        form = CustomAuthenticationForm(request.POST)
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect("posts:main")
        else:
            messages.error(request, "아이디 또는 비밀번호가 올바르지 않습니다.")
    else:
        form = CustomAuthenticationForm()
    context = {
        "form": form,
    }
    return render(request, "accounts/login.html", context)


@login_required
def logout(request):
    auth_logout(request)
    return redirect("posts:main")


def signup(request):
    if request.user.is_authenticated:
        return redirect("posts:main")

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
    return redirect("posts:main")


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
    shared_posts_by_me = Post.objects.filter(
        user=person, shared_with__isnull=False
    ).order_by("-date")
    shared_posts_to_me = person.shared_posts.all().order_by("-date")
    posts_with_my_comments = (
        Post.objects.filter(comment__user=person)
        .exclude(user=person)
        .distinct()
        .order_by("-date")
    )
    posts_with_comments_by_others = (
        Post.objects.filter(comment__user__in=followings, user=person)
        .distinct()
        .order_by("-date")
    )

    context = {
        "person": person,
        "followings": followings,
        "followers": followers,
        "shared_posts_by_me": shared_posts_by_me,
        "shared_posts_to_me": shared_posts_to_me,
        "posts_with_my_comments": posts_with_my_comments,
        "posts_with_comments_by_others": posts_with_comments_by_others,
    }
    return render(request, "accounts/mypage.html", context)


@login_required
def search_friends(request, search_query):
    User = get_user_model()
    if request.method == "GET":
        results = User.objects.filter(
            Q(username__icontains=search_query) | Q(nickname__icontains=search_query)
        ).exclude(pk=request.user.pk)

        results_list = [
            {
                "pk": user.pk,
                "username": user.username,
                "nickname": user.nickname,
                "profile_img": user.profile_img.url if user.profile_img else None,
                "is_following": user.followers.filter(pk=request.user.pk).exists(),
            }
            for user in results
        ]

        return JsonResponse(results_list, safe=False)
    return JsonResponse([], safe=False)


@csrf_exempt
def check_duplicate(request):
    User = get_user_model()
    if request.method == "POST":
        username = request.POST.get("username")
        nickname = request.POST.get("nickname")

        username_exists = User.objects.filter(username=username).exists()
        nickname_exists = User.objects.filter(nickname=nickname).exists()

        result_data = {
            "username": {"exists": username_exists, "message": "사용 중인 아이디입니다."},
            "nickname": {"exists": nickname_exists, "message": "사용 중인 닉네임입니다."},
        }

        return JsonResponse(result_data)
