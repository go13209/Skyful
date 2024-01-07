from django.db import models
from django.conf import settings
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill


class Post(models.Model):
    def image_path(instance, filename):
        return f"accounts/{instance.post.pk}/{filename[:10]}"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField(unique=True)
    title = models.CharField(max_length=50)
    content = models.TextField()
    public = models.BooleanField(default=False)
    shared_with = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="shared_posts", blank=True
    )


class PostImage(models.Model):
    def image_path(instance, filename):
        return f"accounts/{instance.post.pk}/{filename[:10]}"

    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="image")
    image = ProcessedImageField(
        upload_to=image_path,
        processors=[ResizeToFill(200, 200)],
        format="JPEG",
        options={"quality": 90},
        null=True,
        blank=True,
    )
