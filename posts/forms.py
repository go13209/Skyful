from django import forms
from .models import Post, Comment


class PostForm(forms.ModelForm):
    date = forms.CharField(
        label="날짜",
        label_suffix="",
        widget=forms.DateInput(attrs={"class": "form-control", "type": "date"}),
    )
    title = forms.CharField(
        label="제목",
        label_suffix="",
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "제목",
            }
        ),
    )
    content = forms.CharField(
        label="내용",
        label_suffix="",
        widget=forms.Textarea(
            attrs={
                "class": "form-control",
                "placeholder": "내용",
            }
        ),
    )
    weather = forms.ChoiceField(
        label="날씨",
        label_suffix="",
        widget=forms.RadioSelect(
            attrs={"class": "form-check-input"},
        ),
        choices=[(1, "맑음"), (2, "흐림"), (3, "비"), (4, "눈")],
    )
    post_img = forms.ImageField(
        label="이미지(선택)", widget=forms.ClearableFileInput(), required=False
    )

    class Meta:
        model = Post
        fields = (
            "date",
            "weather",
            "title",
            "content",
            "post_img",
        )


class CommentForm(forms.ModelForm):
    content = forms.CharField(
        label="댓글",
        label_suffix="",
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "댓글",
            }
        ),
    )

    class Meta:
        model = Comment
        fields = ("content",)
