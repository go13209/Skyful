from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill


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
