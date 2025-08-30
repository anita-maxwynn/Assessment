from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Count

from .models import Profile, Education, Skill, Project, Work, Link
from .serializers import (
    ProfileSerializer, EducationSerializer, SkillSerializer,
    ProjectSerializer, WorkSerializer, LinkSerializer
)
from .permissions import IsOwnerOrReadOnly


class HealthCheckViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({"status": "ok"}, status=200)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'])
    def search(self, request):
        q = request.query_params.get('q', '').strip().lower()
        if not q:
            return Response({'error': 'Query parameter "q" required.'}, status=400)

        results = []

        profile = Profile.objects.first()
        if not profile:
            return Response({'error': 'No profile found.'}, status=404)

        # Exact fields (no "projects" here)
        exact_fields = {
            "email": profile.email,
            "name": profile.name,
            "bio": profile.bio,
            "profilepic": profile.profilePic.url if profile.profilePic else None,
            "skills": list(profile.skills.values_list('name', flat=True)),
            "education": [
                {"degree": e.degree, "institution": e.institution, "start_year": e.start_year, "end_year": e.end_year}
                for e in profile.education.all()
            ],
            "work": [
                {"role": w.role, "company": w.company, "start_date": w.start_date, "end_date": w.end_date, "description": w.description}
                for w in profile.work.all()
            ],
            "links": [
                {"type": l.type, "url": l.url} for l in profile.links.all()
            ]
        }

        # Check exact fields first
        for field, value in exact_fields.items():
            if q == field:
                results.append({"type": field, "value": value})

        # Content-based search
        if q in profile.email.lower():
            results.append({"type": "email", "value": profile.email})
        if q in profile.name.lower():
            results.append({"type": "name", "value": profile.name})
        if q in profile.bio.lower():
            results.append({"type": "bio", "value": profile.bio})

        # Skills
        matched_skills = [s.name for s in profile.skills.all() if q in s.name.lower()]
        if matched_skills:
            results.append({"type": "skills", "value": matched_skills})

        # Education
        matched_education = [
            {"degree": e.degree, "institution": e.institution, "start_year": e.start_year, "end_year": e.end_year}
            for e in profile.education.all()
            if q in e.degree.lower() or q in e.institution.lower()
        ]
        if matched_education:
            results.append({"type": "education", "value": matched_education})

        # Projects — only return matching projects
        matched_projects = [
            {"title": p.title, "tech_stack": p.tech_stack, "link": p.link}
            for p in profile.projects.all()
            if q in p.title.lower()
        ]
        if matched_projects:
            results.append({"type": "projects", "value": matched_projects})

        # Work
        matched_work = [
            {"role": w.role, "company": w.company, "start_date": w.start_date, "end_date": w.end_date, "description": w.description}
            for w in profile.work.all()
            if q in w.role.lower() or q in w.company.lower()
        ]
        if matched_work:
            results.append({"type": "work", "value": matched_work})

        # Links
        matched_links = [
            {"type": l.type, "url": l.url}
            for l in profile.links.all()
            if q in l.type.lower() or q in l.url.lower()
        ]
        if matched_links:
            results.append({"type": "links", "value": matched_links})

        return Response(results)



class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    @action(detail=False, methods=['get'])
    def top(self, request):
        top_skills = Skill.objects.values('name').annotate(count=Count('name')).order_by('-count')[:5]
        return Response(top_skills)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    @action(detail=False, methods=['get'])
    def filter_by_skill(self, request):
        skill = request.query_params.get('skill')
        if not skill:
            return Response({'error': 'Skill parameter required.'}, status=400)
        projects = Project.objects.filter(tech_stack__icontains=skill)
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)


class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class LinkViewSet(viewsets.ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
