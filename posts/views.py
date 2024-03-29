from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .forms import PostForm, CommentForm
from .models import Post, Comment
from accounts.models import Notification
from datetime import datetime
from calendar import monthrange
import os


def main(request):
    if request.user.is_authenticated:
        current_year = datetime.now().year
        current_month = datetime.now().month
        future_years = range(current_year, current_year + 6)
        months_range = range(1, 13)
        days_of_week = ["일", "월", "화", "수", "목", "금", "토"]

        context = {
            "current_year": current_year,
            "current_month": current_month,
            "future_years": future_years,
            "months_range": months_range,
            "days_of_week": days_of_week,
        }
        return render(request, "posts/main.html", context)
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
            post.user = person
            post.public = request.POST.get("public") == "on"
            post.save()

            shared_users = request.POST.getlist("shared_with")
            post.shared_with.set(shared_users)
            return redirect("posts:main")
    else:
        form = PostForm(initial={"date": post_date})

    followings = person.followings.all()
    followers = person.followers.all()
    friends = followings & followers

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
    comments = post.comment_set.all()
    context = {
        "post": post,
        "comments": comments,
        "form": CommentForm(),
    }
    return render(request, "posts/detail.html", context)


@login_required
def update(request, post_pk):
    post = Post.objects.get(pk=post_pk)
    User = get_user_model()
    person = User.objects.get(pk=request.user.pk)

    if request.user != post.user:
        return redirect("posts:main")

    if request.method == "POST":
        form = PostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.public = request.POST.get("public") == "on"
            post.save()

            shared_users = request.POST.getlist("shared_with")
            post.shared_with.set(shared_users)

            return redirect("posts:detail", post.user.pk, post.date)
    else:
        form = PostForm(instance=post)

    weather = post.weather
    followings = person.followings.all()
    followers = person.followers.all()
    friends = followings & followers

    context = {
        "post": post,
        "form": form,
        "weather": weather,
        "friends": friends,
    }
    return render(request, "posts/update.html", context)


@login_required
def delete(request, post_pk):
    post = get_object_or_404(Post, pk=post_pk)
    if request.user == post.user:
        if post.post_img:
            if os.path.isfile(post.post_img.path):
                os.remove(post.post_img.path)
        post.delete()
    return redirect("posts:main")


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

            if post.user != request.user:
                Notification.objects.create(
                    user=post.user,
                    message=f"{request.user.nickname}님이 당신의 {post.date} 일기에 댓글을 달았습니다.",
                )
            return redirect("posts:detail", post.user.pk, post.date)


@login_required
def comment_delete(request, post_pk, comment_pk):
    post = Post.objects.get(pk=post_pk)
    comment = Comment.objects.get(pk=comment_pk)
    if request.user == comment.user:
        comment.delete()
    return redirect("posts:detail", post.user.pk, post.date)


@login_required
def comment_update(request, post_pk, comment_pk):
    post = Post.objects.get(pk=post_pk)
    comment = Comment.objects.get(pk=comment_pk)

    if request.user != comment.user:
        return redirect("posts:detail", post.user.pk, post.date)

    if request.method == "POST":
        form = CommentForm(request.POST, instance=comment)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = post
            comment.user = request.user
            comment.save()
            return redirect("posts:detail", post.user.pk, post.date)
    return redirect("posts:detail", post.user.pk, post.date)
