from django.shortcuts import render, redirect
from .forms import CustomAuthenticationForm
from django.contrib.auth import login as auth_login


def login(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            return redirect('skyful/index.html')
    else:
        form = CustomAuthenticationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/login.html', context)