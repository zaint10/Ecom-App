from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        username = settings.DJANGO_SUPERUSER_USERNAME
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username,
                settings.DJANGO_SUPERUSER_EMAIL,
                settings.DJANGO_SUPERUSER_PASSWORD,
            )
            self.stdout.write(self.style.SUCCESS("Admin user has created"))
        else:
            self.stdout.write(self.style.SUCCESS("Admin user already exists"))
