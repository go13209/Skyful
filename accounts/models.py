from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from django.conf import settings


class User(AbstractUser):
    def image_path(instance, filename):
        return f"accounts/{instance.username}/{filename}"

    username = models.CharField(max_length=20, unique=True)
    nickname = models.CharField(max_length=20, unique=True)
    profile_img = ProcessedImageField(
        upload_to=image_path,
        processors=[ResizeToFill(200, 200)],
        options={"quality": 90},
        null=True,
        blank=True,
    )
    followings = models.ManyToManyField(
        "self", symmetrical=False, related_name="followers"
    )


class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
