# Generated by Django 4.2.11 on 2024-05-06 20:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import shortuuid.django_fields


class Migration(migrations.Migration):

    dependencies = [
        ('userauths', '0004_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='pid',
            field=shortuuid.django_fields.ShortUUIDField(alphabet=None, length=10, max_length=20, prefix='', unique=True, verbose_name='uuid'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
