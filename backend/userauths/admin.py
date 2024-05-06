from django.contrib import admin

from userauths.models import Profile, User


# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "fullname",
        "email",
        "phone",
        "date_joined",
        "is_active",
        "is_staff",
    ]
    search_fields = ["first_name", "last_name", "email"]
    list_filter = ["date_joined", "is_active"]


class ProfileAdmin(admin.ModelAdmin):
    list_display = [
        "pid",
        "user",
    ]
    search_fields = [
        "uuid",
    ]


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
