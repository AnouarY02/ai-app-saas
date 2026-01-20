# FitTrack Pro

## Overview
FitTrack Pro is a modern SaaS platform for fitness tracking, featuring a Next.js dashboard and a FastAPI backend. It supports typed full-stack code sharing and rapid development with Docker Compose and Terraform.

## Monorepo Structure
- `frontend/` – Next.js 14 + TypeScript + Tailwind CSS dashboard
- `backend/` – FastAPI (Python 3.11) API server
- `shared/` – Shared types, validation schemas, and UI components
- `infra/` – Infrastructure as code (Docker Compose, Terraform, DB init)

## Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (for local dev outside Docker)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (monorepo scripts)

## Environment Variables Setup
1. Copy `.env.example` to `.env` and fill in required values:
   ```sh
   cp .env.example .env
   ```
2. Edit `.env` as needed for your environment (see comments in file).

## Local Development (Docker Compose)
To start all services (frontend, backend, db) in Docker:
```sh
yarn start
# or
docker-compose up
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000/docs](http://localhost:4000/docs)
- Database: localhost:5432 (user: postgres, password: postgres)

## Running Frontend and Backend Separately
For hot reload and debugging:
```sh
yarn dev
```
This runs frontend and backend in parallel (frontend on port 3000, backend on port 4000).

## Database Migrations
Apply migrations to the database (container must be running):
```sh
yarn migrate
```
This runs `alembic upgrade head` inside the backend container.

## Testing
Run tests for both frontend and backend:
```sh
yarn test
```

## Shared Types and Validation
- Shared TypeScript types: `shared/types/`
- JSON Schemas: `shared/validation/`
- Shared UI components: `shared/ui/`

## Deployment Notes
- Environment variables must be set in production.
- Use `infra/terraform/` for cloud infrastructure provisioning.
- Build and run containers with `docker-compose` for deployment.

## Troubleshooting
- Ensure Docker and Docker Compose are installed and running.
- Check `.env` for missing or incorrect variables.
- Use `docker-compose logs` to view service logs.
- For database issues, verify `DATABASE_URL` and DB container health.
