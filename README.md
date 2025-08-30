# Assessment Test Playground

This project is a full-stack playground that stores your own profile data and exposes it via a small API and minimal frontend for queries.

## Architecture
- **Backend:** Django REST API (PostgreSQL)
- **Frontend:** React (Vite)
- **Database:** PostgreSQL (cloud hosted)

## Setup (Local)
1. Clone the repo
2. Set up Python virtualenv and install requirements (`pip install -r backend/requirements.txt`)
3. Set up `.env` in `backend/` (see sample)
4. Run migrations (`python manage.py migrate`)
5. Start backend (`daphne backend.asgi:application`)
6. Start frontend (`npm install && npm run dev` in `frontend/`)

## Setup (Production)
- Backend and frontend can be deployed to Render, Vercel, Heroku, etc.
- Update `.env` for production database and secrets.

## API Endpoints
- `/profiles/` CRUD for profile
- `/education/`, `/skills/`, `/projects/`, `/work/`, `/links/` CRUD for related data
- `/projects/filter_by_skill/?skill=python` — filter projects by skill
- `/skills/top/` — top skills
- `/profiles/search/?q=...` — search profile data
- `/health/` — health check

## Schema
See `backend/schema.md` for database schema.

## Sample Requests
```
curl https://your-backend-url/health/
curl https://your-backend-url/profiles/search/?q=python
```

## Known Limitations
- No pagination, rate-limit, or advanced filtering
- Minimal UI

## Resume
[Your Resume Link Here]

## URLs
- Backend: https://assessment-twyo.onrender.com
- Frontend: [your-frontend-url]
- Repo: [your-github-url]
