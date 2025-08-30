# Assessment Test Playground

This project is a full-stack playground that stores My own profile data and exposes it via a small API and minimal frontend for queries.

## Architecture
- **Backend:** Django REST API (Render)
- **Frontend:** React (Vite)
- **Database:** PostgreSQL (cloud hosted in Render)

## Setup (Local)
1. Clone the repo
2. Set up Python virtualenv and install requirements (`pip install -r backend/requirements.txt`)
3. Set up `.env` in `backend/` (see sample)
4. Run migrations (`python manage.py migrate`)
5. Start backend (`daphne -b 0.0.0.0 -p $PORT backend.asgi:application`)
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
See [`backend/schema.md`](backend/schema.md) for database schema.

## Sample Requests
```
curl https://assessment-twyo.onrender.com/health/
curl https://assessment-twyo.onrender.com/profiles/search/?q=python
```

## Known Limitations
- No pagination, rate-limiting, or caching implemented.
- Minimal UI

## Resume
[Resume](https://drive.google.com/file/d/1wS9x9Udjjgs98tWE3Ikjj1-2q22IuqX8/view)

## URLs
- Backend: https://assessment-twyo.onrender.com
- Frontend: https://me-api-frontend.vercel.app/
- Repo: https://github.com/anita-maxwynn/Assessment

## For more details see these READMEs
- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)