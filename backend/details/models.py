from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
# Create your models here.
from django.contrib.auth.models import User
class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True, null=True)
    profilePic = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    created_by = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profiles")
    def __str__(self):
        return self.name


class Education(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="education")
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=200)
    start_year = models.IntegerField()
    end_year = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.degree} at {self.institution}"


class Skill(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="skills")
    name = models.CharField(max_length=100)
    level = models.CharField(max_length=50, blank=True, null=True)  # Beginner/Intermediate/Expert

    def __str__(self):
        return self.name


class Project(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)
    tech_stack = ArrayField(base_field=models.CharField(max_length=100), blank=True, null=True)  # e.g. "Django, React"

    def __str__(self):
        return self.title


class Work(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="work")
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.role} at {self.company}"


class Link(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="links")
    type = models.CharField(max_length=50)  # GitHub, LinkedIn, Portfolio
    url = models.URLField()
    
    def __str__(self):
        return f"{self.type}: {self.url}"
