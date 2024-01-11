from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .forms import PostForm, CommentForm
from .models import Post
from datetime import datetime


def main(request):
    if request.user.is_authenticated:
        return render(request, "posts/main.html")
    else:
        return redirect("accounts:login")


@login_required
def create(request, post_date):
    User = get_user_model()
    person = User.objects.get(pk=request.user.pk)
    post_date = datetime.strptime(post_date, "%Y-%m-%d").date()

    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.public = request.POST.get("public") == "on"
            post.save()

            shared_users = request.POST.getlist("shared_with")
            post.shared_with.set(shared_users)

            return redirect("posts:main")
    else:
        form = PostForm(initial={"date": post_date})

    following = person.followings.all()
    followers = person.followers.all()
    friends = following | followers

    context = {
        "form": form,
        "date": post_date,
        "friends": friends,
    }
    return render(request, "posts/create.html", context)


@login_required
def check_post(request, post_date):
    try:
        post = Post.objects.get(user=request.user, date=post_date)
        return JsonResponse({"has_post": True})
    except Post.DoesNotExist:
        return JsonResponse({"has_post": False})


@login_required
def detail(request, user_pk, post_date):
    post = Post.objects.get(user=user_pk, date=post_date)
    context = {
        "post": post,
        "form": CommentForm(),
    }
    return render(request, "posts/detail.html", context)


@login_required
def comment_create(request, post_pk):
    post = Post.objects.get(pk=post_pk)
    if request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = post
            comment.user = request.user
            comment.save()
            return redirect("posts:detail", request.user.pk, post.date)


@login_required
def update(request, post_pk):
    post = Post.objects.get(pk=post_pk)
    User = get_user_model()
    person = User.objects.get(pk=request.user.pk)

    if request.method == "POST":
        form = PostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.public = request.POST.get("public") == "on"
            post.save()

            shared_users = request.POST.getlist("shared_with")
            post.shared_with.set(shared_users)

            return redirect("posts:main")
    else:
        form = PostForm(instance=post)

    following = person.followings.all()
    followers = person.followers.all()
    friends = following | followers

    context = {
        "post": post,
        "form": form,
        "friends": friends,
    }
    return render(request, "posts/update.html", context)
