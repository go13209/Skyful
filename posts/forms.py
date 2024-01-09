from django import forms
from .models import Post, PostImage, Comment
from django.utils.translation import gettext_lazy as _


class PostForm(forms.ModelForm):
    date = forms.CharField(
        label="날짜",
        label_suffix="",
        widget=forms.DateInput(
            attrs={"class": "form-control form-field", "type": "date"}
        ),
    )
    title = forms.CharField(
        label="제목",
        label_suffix="",
        widget=forms.TextInput(
            attrs={
                "class": "form-control form-field",
                "placeholder": "제목",
            }
        ),
    )
    content = forms.CharField(
        label="내용",
        label_suffix="",
        widget=forms.Textarea(
            attrs={
                "class": "form-control form-field",
                "placeholder": "내용",
            }
        ),
    )

    class Meta:
        model = Post
        fields = (
            "date",
            "title",
            "content",
        )


class PostImageForm(forms.ModelForm):
    image = forms.ImageField(
        label="", widget=forms.ClearableFileInput(), required=False
    )

    class Meta:
        model = PostImage
        fields = ("image",)


class CommentForm(forms.ModelForm):
    content = forms.CharField(
        label="댓글",
        label_suffix="",
        widget=forms.TextInput(
            attrs={
                "class": "form-control form-field",
                "placeholder": "댓글",
            }
        ),
    )

    class Meta:
        model = Comment
        fields = ("content",)
