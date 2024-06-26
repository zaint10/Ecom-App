# Generated by Django 4.2.11 on 2024-05-06 19:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('userauths', '0003_remove_user_full_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(blank=True, default='/default/default-user.jpg', null=True, upload_to='image', verbose_name='image')),
                ('about', models.TextField(blank=True, max_length=100, null=True, verbose_name='about')),
                ('gender', models.CharField(max_length=100, verbose_name='gender')),
                ('country', models.CharField(max_length=100, verbose_name='country')),
                ('state', models.CharField(max_length=100, verbose_name='country')),
                ('city', models.CharField(max_length=100, verbose_name='city')),
                ('address', models.CharField(max_length=100, verbose_name='address')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='date')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
