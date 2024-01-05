from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill


class Post(models.Model):
    def image_path(instance, filename):
        return f"accounts/{instance.post.pk}/{filename[:10]}"

    date = models.DateField(unique=True)
    title = models.CharField(max_length=50)
    content = models.TextField()


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
