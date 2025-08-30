from django.contrib import admin
from .models import Profile, Education, Skill, Project, Work, Link
# Register your models here.
admin.site.register(Profile)
admin.site.register(Education)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(Work)
admin.site.register(Link)
