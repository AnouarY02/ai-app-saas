# ai-app-saas

## Project Overview
A SaaS AI application monorepo with a React frontend, Node.js/Express backend, and shared TypeScript utilities. Includes infrastructure for local development, Docker, and Kubernetes deployment.

## Monorepo Structure
- `frontend/` — React + TypeScript SPA
- `backend/` — Node.js + Express API (TypeScript)
- `shared/` — Shared TypeScript types and utilities
- `infra/` — Infrastructure, CI/CD, Docker, K8s, linting, formatting

## Prerequisites
- Node.js (>=18)
- npm (>=9)
- Docker (for containerized development)
- (Optional) Kubernetes for deployment

## Environment Variables
Required:
- `NODE_ENV` — Environment (`development`, `production`, etc.)
- `PORT` — Port to run the backend (default: 4000)
- `JWT_SECRET` — Secret for JWT authentication
- `FRONTEND_URL` — Public URL for the frontend (e.g., http://localhost:3000)
- `BACKEND_URL` — Public URL for the backend (e.g., http://localhost:4000)

Optional:
- `LOG_LEVEL` — Logging verbosity (default: `info`)
- `SESSION_COOKIE_NAME` — Cookie name for sessions
- `CORS_ORIGIN` — Allowed CORS origin (default: frontend URL)

Copy `.env.example` to `.env` and fill in your values.

## Local Development
### Start All Services
```
npm run dev
```
This runs frontend and backend in parallel (see individual package scripts for details).

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

### Start Individually
```
npm run start:frontend
npm run start:backend
```

## Building the App
```
npm run build
```
Builds all packages (frontend, backend, shared) using Lerna and TypeScript project references.

## Running with Docker
Build and start both frontend and backend containers:
```
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## API Overview
The backend exposes RESTful endpoints under `/api`. See `backend/src/routes/api.ts` for details.

## Authentication Flow
- JWT-based authentication
- Login issues a JWT, stored in a cookie or localStorage
- Protected routes require valid JWT in Authorization header

## Shared Types & Utilities
- Shared TypeScript types: `shared/src/types/`
- Shared API client: `shared/src/utils/apiClient.ts`
- Shared constants: `shared/src/constants/`

## Testing
Run all tests:
```
npm run test
```
(Each package may define its own test scripts.)

## Linting & Formatting
- Lint: `npm run lint`
- Format: `npm run format`

## Deployment Notes
- Dockerfiles for frontend/backend in `infra/docker/`
- Kubernetes manifests in `infra/k8s/`
- CI/CD via GitHub Actions (`infra/.github/workflows/ci.yml`)

## Troubleshooting
- Ensure all environment variables are set (see `.env.example`)
- Use `npm run lint` and `npm run format` to fix code style issues
- Check Docker logs with `docker-compose logs`

