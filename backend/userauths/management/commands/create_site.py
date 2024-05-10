from django.conf import settings
from django.contrib.sites.models import Site
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Creates a new site with the specified domain"

    def handle(self, *args, **options):
        domain = settings.SITE_DOMAIN
        created = Site.objects.get_or_create(
            id=settings.SITE_ID, domain=settings.DEPLOYMENT_URL_HOST, name=domain
        )
        if created:
            self.stdout.write(
                self.style.SUCCESS(f'Site "{domain}" created successfully.')
            )
