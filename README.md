# SaaS CRM

## Project Overview
A modern SaaS CRM application built as a TypeScript monorepo. It features a React + Tailwind CSS frontend, a Node.js (Express) backend, and a shared contracts/validation layer for robust type safety.

## Monorepo Structure
- `frontend/` — React + TypeScript + Tailwind CSS app
- `backend/` — Node.js + Express + TypeScript API
- `shared/` — Shared models and validation logic
- `infra/` — Tooling and configuration (lint, prettier, jest, compose)

## Prerequisites
- [Node.js](https://nodejs.org/) >= 16.x
- [Yarn](https://yarnpkg.com/) (recommended for workspaces)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Environment Variables
Copy `.env.example` to `.env` and fill in required values:

```
cp .env.example .env
```

- `NODE_ENV` (required): `development` or `production`
- `PORT` (required): Backend port (default: 4000)
- `JWT_SECRET` (required): Secret for JWT signing
- `FRONTEND_URL` (required): e.g. `http://localhost:3000`
- `BACKEND_URL` (required): e.g. `http://localhost:4000`
- `LOG_LEVEL` (optional): Logging level
- `CORS_ORIGIN` (optional): Allowed CORS origin
- `DATABASE_URL` (optional): Database connection string

## Local Development

### With Docker Compose
1. Copy `.env.example` to `.env` and edit as needed.
2. Run:
   ```
   yarn start
   # or
   docker-compose up --build
   ```
3. Frontend: [http://localhost:3000](http://localhost:3000)
   Backend: [http://localhost:4000](http://localhost:4000)

### Without Docker (Local Node)
1. Install dependencies:
   ```
   yarn install
   ```
2. Build all packages:
   ```
   yarn build
   ```
3. Start dev servers:
   ```
   yarn dev
   ```

## Scripts Reference
- `yarn dev` — Start frontend and backend in dev mode
- `yarn build` — Build all packages
- `yarn lint` — Lint all code
- `yarn format` — Format codebase with Prettier
- `yarn test` — Run all tests
- `yarn start` — Start with Docker Compose

## API Endpoints Overview
See `backend/src/routes/` for available REST endpoints for contacts and deals.

## Shared Contracts & Validation
Shared models and validation logic live in `shared/` and are used by both frontend and backend for type safety and DRY validation.

## Testing
- Run all tests:
  ```
  yarn test
  ```
- Jest is configured for unit/integration tests in all packages.

## Code Quality (Linting & Formatting)
- Lint: `yarn lint`
- Format: `yarn format`
- ESLint and Prettier configs are in `infra/`

## Deployment Notes
- Production Docker images are built from `frontend/Dockerfile` and `backend/Dockerfile`.
- Set all required environment variables in your deployment platform.

## Troubleshooting
- Ensure `.env` is present and all required variables are set.
- For Docker issues, check logs with `docker-compose logs`.
- For workspace issues, try `yarn install --force`.
