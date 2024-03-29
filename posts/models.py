from django.db import models
from django.conf import settings
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill


class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    title = models.CharField(max_length=50)
    content = models.TextField()
    weather = models.IntegerField()
    public = models.BooleanField(default=False)
    shared_with = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="shared_posts", blank=True
    )
    post_img = ProcessedImageField(
        upload_to="posts",
        processors=[ResizeToFill(200, 200)],
        options={"quality": 90},
        null=True,
        blank=True,
    )


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
