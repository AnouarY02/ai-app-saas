# TestApp

## Project Overview
TestApp is a SaaS AI application built as a monorepo, featuring a Next.js frontend, FastAPI backend, and PostgreSQL database. Infrastructure is managed with Docker Compose for local development and Terraform for cloud provisioning.

## Monorepo Structure
- `frontend/` – Next.js (TypeScript) frontend
- `backend/` – FastAPI (Python) backend
- `shared/` – Shared TypeScript code
- `infra/` – Infrastructure as code (Docker Compose, Terraform, scripts)

## Tech Stack
- **Frontend:** Next.js, React, TypeScript
- **Backend:** FastAPI, Python, SQLAlchemy, Alembic
- **Database:** PostgreSQL
- **Infra:** Docker Compose, Terraform
- **Testing:** Jest (frontend), Pytest (backend)

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/AnouarY02/ai-app-saas.git
   cd ai-app-saas
   ```
2. Copy and edit environment variables:
   ```bash
   cp .env.example .env
   # Edit .env as needed
   ```
3. Start all services with Docker Compose:
   ```bash
   npm run docker:up
   ```

## Environment Variables
See `.env.example` for all required and optional environment variables.

- `DATABASE_URL` (required)
- `JWT_SECRET_KEY` (required)
- `JWT_ALGORITHM` (required)
- `FRONTEND_URL` (required)
- `BACKEND_URL` (required)
- `LOG_LEVEL` (optional)
- `PORT` (optional)
- `CORS_ORIGINS` (optional)

## Running Locally (Docker & Non-Docker)
### With Docker Compose
- Start: `npm run docker:up`
- Stop: `npm run docker:down`

### Without Docker
- Install dependencies in each package (`frontend/`, `backend/`)
- Start database (e.g., local Postgres)
- Run backend: `npm run dev:backend`
- Run frontend: `npm run dev:frontend`

## Frontend Development
- Dev server: `npm run dev:frontend`
- Build: `npm run build:frontend`
- Lint: `npm run lint:frontend`
- Test: `npm run test:frontend`

## Backend Development
- Dev server: `npm run dev:backend`
- Migrate DB: `npm run migrate:backend`
- Test: `npm run test:backend`

## Database & Migrations
- Database runs in Docker Compose as `db` (Postgres)
- Migrations via Alembic: `npm run migrate:backend`

## Testing
- Frontend: `npm run test:frontend`
- Backend: `npm run test:backend`

## Deployment & Infrastructure (Terraform)
- See `infra/terraform/` for cloud infrastructure setup
- Initialize: `cd infra/terraform && terraform init`
- Plan: `terraform plan`
- Apply: `terraform apply`

## Troubleshooting & FAQ
- Ensure `.env` is configured
- If ports are in use, adjust in `.env` and `docker-compose.yml`
- For database issues, check `db` service logs
- For further help, see individual package READMEs or open an issue
