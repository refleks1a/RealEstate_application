from django.db import models
from django.utils.translation import gettext_lazy

from ..profiles.models import Profile
from ..common.models import TimeStampedUUIDModel

from autoslug import AutoSlugField

import random
import string


class PostPublishedManager(models.Manager):
    def get_queryset(self):
        return (
            super(PostPublishedManager, self)
            .get_queryset()
            .filter(published_status=True)
        )
    

class Post(TimeStampedUUIDModel):

    title = models.CharField(max_length=127, unique=True, verbose_name=gettext_lazy("Post Title"))
    subtitle = models.CharField(max_length=255, blank=True, verbose_name=gettext_lazy("Post Subtitle"))
    slug = AutoSlugField(populate_from="title", unique=True, always_update=True)
    body = models.TextField(verbose_name=gettext_lazy("Body of blog"),
        default="Default (Should be changed!)")

    photo1 = models.ImageField(verbose_name=gettext_lazy("Photo 1"), default = "/interior_sample.jpg",
        null=True, blank=True)
    photo2 = models.ImageField(verbose_name=gettext_lazy("Photo 2"), default = "/interior_sample.jpg",
        null=True, blank=True)
    photo3 = models.ImageField(verbose_name=gettext_lazy("Photo 3"), default = "/interior_sample.jpg",
        null=True, blank=True)

    publish_date = models.DateTimeField(blank=True, null=True)
    published_status = models.BooleanField(default=False)

    reference_code = models.CharField(verbose_name=gettext_lazy("Post reference code"),
        max_length=255, unique=True, blank=True)

    author = models.ForeignKey(Profile, verbose_name = gettext_lazy("Author"),
        related_name = "author", on_delete=models.DO_NOTHING)
    views = models.IntegerField(verbose_name=gettext_lazy("Total views"), default=0)

    objects = models.Manager()
    published = PostPublishedManager()

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = gettext_lazy('Post')
        verbose_name_plural = gettext_lazy("Posts")

    def save(self, *args, **kwargs):
        self.title = str.title(self.title)
        self.body = str.capitalize(self.body)
        self.reference_code = "".join(random.choices(
            string.ascii_uppercase + string.digits + string.ascii_lowercase, k=15
            ))
        super(Post, self).save(*args, **kwargs)    


class PostViews(TimeStampedUUIDModel):
    ip = models.CharField(verbose_name=gettext_lazy("IP address"), max_length=256)
    post = models.ForeignKey(Post, related_name="post_views",
        on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Total views on: {self.post.reference_code} is - {self.post.views} view(s)"
    
    class Meta:
        verbose_name = "Total views on post"
        verbose_name_plural = "Total post views"
