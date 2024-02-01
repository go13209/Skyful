from django import forms
from django.contrib.auth.forms import (
    AuthenticationForm,
    UserCreationForm,
    UserChangeForm,
    PasswordChangeForm,
)
from django.contrib.auth import get_user_model


class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        label="아이디",
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
            }
        ),
    )
    password = forms.CharField(
        label="비밀번호",
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
            }
        ),
    )


class CustomUserCreationForm(UserCreationForm):
    username = forms.CharField(
        label="* 아이디",
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
            }
        ),
    )
    nickname = forms.CharField(
        label="* 닉네임",
        required=True,
        widget=forms.TextInput(
            attrs={
                "class": "form-control form-field",
            }
        ),
    )
    password1 = forms.CharField(
        label="* 비밀번호",
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
            }
        ),
    )
    password2 = forms.CharField(
        label="* 비밀번호 확인",
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
            }
        ),
    )
    profile_img = forms.ImageField(
        label="프로필 이미지(선택)", widget=forms.ClearableFileInput(), required=False
    )

    class Meta:
        model = get_user_model()
        fields = (
            "username",
            "nickname",
            "password1",
            "password2",
            "profile_img",
        )


class CustomUserChangeForm(UserChangeForm):
    nickname = forms.CharField(
        label="* 닉네임",
        required=True,
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
            }
        ),
    )
    profile_img = forms.ImageField(
        label="프로필 이미지(선택)", widget=forms.ClearableFileInput(), required=False
    )

    class Meta:
        model = get_user_model()
        fields = (
            "nickname",
            "profile_img",
        )


class CustomPasswordChangeForm(PasswordChangeForm):
    old_password = forms.CharField(
        label="기존 비밀번호",
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
            }
        ),
    )
    new_password1 = forms.CharField(
        label="새 비밀번호",
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
            }
        ),
    )
    new_password2 = forms.CharField(
        label="새 비밀번호 확인",
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
            }
        ),
    )

    class Meta(PasswordChangeForm):
        fields = "__all__"
