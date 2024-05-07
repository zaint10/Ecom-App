from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _
from shortuuid.django_fields import ShortUUIDField
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    phone = PhoneNumberField(_("phone"), max_length=100, null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

    @property
    def fullname(self):
        return f"{self.first_name} {self.last_name}"

    def save(
        self,
        *args,
        **kwargs,
    ) -> None:

        return super().save(*args, **kwargs)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(
        _("image"),
        upload_to="image",
        default="/default/default-user.jpg",
        null=True,
        blank=True,
    )
    about = models.TextField(_("about"), max_length=100, null=True, blank=True)
    gender = models.CharField(_("gender"), max_length=100)
    country = models.CharField(_("country"), max_length=100)
    state = models.CharField(_("country"), max_length=100)
    city = models.CharField(_("city"), max_length=100)
    address = models.CharField(_("address"), max_length=100)
    date = models.DateTimeField(_("date"), auto_now_add=True)
    pid = ShortUUIDField(
        _("uuid"),
        unique=True,
        length=10,
        max_length=20,
    )

    def __str__(self):
        return self.user.email


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

    instance.profile.save()


post_save.connect(create_user_profile, sender=User)
