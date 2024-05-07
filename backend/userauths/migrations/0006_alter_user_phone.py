# Generated by Django 4.2.11 on 2024-05-06 22:28

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('userauths', '0005_profile_pid_alter_profile_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=100, null=True, region=None, verbose_name='phone'),
        ),
    ]
