from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.forms import modelformset_factory
from django.http import JsonResponse
from .forms import PostForm, PostImageForm
from .models import Post, PostImage
from datetime import datetime


def main(request):
    return render(request, "posts/main.html")


@login_required
def create(request, post_date):
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
            post_form.save()

            for form in formset.cleaned_data:
                if form:
                    image = form["image"]
                    photo = PostImage(post=post_form, image=image)
                    photo.save()
            return redirect("posts:main")
    else:
        form = PostForm(initial={"date": post_date})
        formset = ImageFormSet(
            queryset=PostImage.objects.none()
        )  # 초기 상태에서 동적으로 필요한 개수의 폼이 나타나도록 추가
    context = {
        "form": form,
        "formset": formset,  # 템플릿에서 formset을 사용하려면 context에 추가해야 합니다.
        "date": post_date,
    }
    return render(request, "posts/create.html", context)


def check_post(request, post_date):
    try:
        post = Post.objects.get(date=post_date)
        return JsonResponse({"has_post": True})
    except Post.DoesNotExist:
        return JsonResponse({"has_post": False})
