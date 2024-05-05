from app import env
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from django.contrib.auth.models import AbstractUser
class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        username = env('DJANGO_ADMIN_USERNAME')
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username, env('DJANGO_ADMIN_EMAIL'), env('DJANGO_ADMIN_PASSWORD'))
            self.stdout.write(self.style.SUCCESS(f'{username} user has created'))
        else:
            self.stdout.write(self.style.SUCCESS(f'{username} user already exists'))
