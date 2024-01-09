from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.forms import modelformset_factory
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from .forms import PostForm, PostImageForm, CommentForm
from .models import Post, PostImage
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
    ImageFormSet = modelformset_factory(
        PostImage,
        form=PostImageForm,
        extra=5,  # 동적으로 필요한 개수의 폼이 나타나도록 수정
    )

    if request.method == "POST":
        postForm = PostForm(request.POST)
        formset = ImageFormSet(
            request.POST, request.FILES, queryset=PostImage.objects.none()
        )
        if postForm.is_valid() and formset.is_valid():
            post_form = postForm.save(commit=False)
            post_form.user = request.user
            post_form.public = request.POST.get("public") == "on"
            post_form.save()

            for form in formset.cleaned_data:
                if form:
                    image = form["image"]
                    photo = PostImage(post=post_form, image=image)
                    photo.save()

            shared_users = request.POST.getlist("shared_with")
            post_form.shared_with.set(shared_users)

            return redirect("posts:main")
    else:
        form = PostForm(initial={"date": post_date})
        formset = ImageFormSet(queryset=PostImage.objects.none())

    following = person.followings.all()
    followers = person.followers.all()
    friends = following | followers

    context = {
        "form": form,
        "formset": formset,
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
    images = PostImage.objects.filter(post=post)
    context = {
        "post": post,
        "images": images,
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
            return redirect("posts:detail", post.date)
