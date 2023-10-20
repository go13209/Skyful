from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm, UserChangeForm, PasswordChangeForm
from django.contrib.auth import get_user_model

class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(label="아이디")
    password = forms.CharField(label="비밀번호", widget=forms.PasswordInput())


class CustomUserCreationForm(UserCreationForm):
    username = forms.CharField(label="* 아이디")
    nickname = forms.CharField(label="* 닉네임", required=True)
    password1 = forms.CharField(label="* 비밀번호", widget=forms.PasswordInput())
    password2 = forms.CharField(label="* 비밀번호 확인", widget=forms.PasswordInput())
    profile_img = forms.ImageField(label='프로필 이미지(선택)', widget=forms.ClearableFileInput(), required=False)
    class Meta(UserCreationForm.Meta):
        model = get_user_model()
        fields = ('username', 'nickname', 'password1', 'password2', 'profile_img',)


class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = get_user_model()
        fields = ('nickname', 'profile_img',)


class CustomPasswordChangeForm(PasswordChangeForm):
    class Meta(PasswordChangeForm):
        fields = '__all__'