from django.db import models
from django.utils.translation import gettext_lazy

from apps.common.models import TimeStampedUUIDModel
from apps.profiles.models import Profile
from real_estate.settings.base import AUTH_USER_MODEL


class Rating(TimeStampedUUIDModel):

    class Range(models.IntegerChoices):
        RATING_1 = 1, gettext_lazy("Poor")
        RATING_2 = 2, gettext_lazy("Fair")
        RATING_3 = 3, gettext_lazy("Good")
        RATING_4 = 4, gettext_lazy("Very good")
        RATING_5 = 5, gettext_lazy("Excellent")

    rater = models.ForeignKey(AUTH_USER_MODEL, verbose_name=gettext_lazy("User providing the rating"),
                              on_delete=models.SET_NULL, null=True)
    agent = models.ForeignKey(Profile, verbose_name=gettext_lazy("Agent being rated"),
                              on_delete=models.SET_NULL, null=True,
                              related_name=gettext_lazy("agent_review"))
    rating = models.IntegerField(verbose_name=gettext_lazy("Rating"),
                                  choices=Range.choices,
                                  help_text=gettext_lazy("1=Poor, 2=Fair, 3=Good, 4=Very good, 5=excellent"),
                                  default=0)    
    comment = models.TextField(verbose_name=gettext_lazy("Comment"))

    class Meta:
        unique_together = ["rater", "agent"]
    
    def __str__(self):
        return f"{self.agent} rated at {self.rating} by {self.rater}"
    