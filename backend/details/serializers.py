from rest_framework import serializers
from .models import Profile, Education, Skill, Project, Work, Link

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = "__all__"

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = "__all__"

class ProfileSerializer(serializers.ModelSerializer):
    education = EducationSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    work = WorkSerializer(many=True, read_only=True)
    links = LinkSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ['created_by', 'id']