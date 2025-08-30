# Backend README

## Overview
Django REST API for candidate profile playground. Stores profile, education, skills, projects, work, and links in PostgreSQL.

## Features
- CRUD for profile, education, skills, projects, work, links
- Custom query endpoints (filter projects by skill, top skills, search)
- JWT authentication
- Health check
- Static and media file serving

## Setup
1. Create and activate virtualenv
2. Install requirements: `pip install -r requirements.txt`
3. Set up `.env` (see sample)
4. Run migrations: `python manage.py migrate`
5. Start server: `daphne -b 0.0.0.0 -p $PORT backend.asgi:application`

## API Endpoints
Endpoints:
- `/profiles/` CRUD {fetches all the profiles. rightnow it's fetching only the first profile as only one exists}
- `/education/`, `/skills/`, `/projects/`, `/work/`, `/links/` CRUD {fetches all the related datas like education, skills, projects, work, and links}
- `/projects/filter_by_skill/?skill=python` — filter projects by skill {fetches projects related to a specific skill}
- `/skills/top/` — top skills {fetches the top skills}
- `/profiles/search/?q=...` — search profile data {fetches profiles matching the search query}
- `/health/` — health check {checks the health of the API}
- `/admin/` — Django admin {provides access to the Django admin interface}
- `/token/` — JWT obtain {issues a new JWT token}
- `/token/refresh/` — JWT refresh {refreshes an existing JWT token}


## Database
Database:
- PostgreSQL
- See `schema.md` for schema


## Seeding
Seeding:
- I have added my all details through the dashboard in the frontend.


## CORS
CORS:
- Ensure CORS is enabled for frontend requests (see `django-cors-headers`)
- For now i have made them hardcoded but could have been using the env file


## Deployment
Deployment:
- is deployed on Render.
- Use: `daphne -b 0.0.0.0 -p $PORT backend.asgi:application`


## Sample Request

Sample Requests:
```
curl https://assessment-twyo.onrender.com/health/
curl https://assessment-twyo.onrender.com/profiles/search/?q=python
curl -X POST https://assessment-twyo.onrender.com/token/ -d '{"username": "youruser", "password": "yourpass"}'
```


## Static & Media
- Static files served at `/static/`
- Media files (profile pics) served at `/media/`

## Authentication
- JWT authentication via `/token/` and `/token/refresh/`
