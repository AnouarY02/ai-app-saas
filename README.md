# AI App SaaS Monorepo

## Project Overview
A scalable AI SaaS application with a React/TypeScript frontend, Node.js/Express backend, and shared utilities/types. Monorepo structure for streamlined development and deployment.

## Monorepo Structure
- `frontend/` — React app (TypeScript)
- `backend/` — Express API (TypeScript)
- `shared/` — Shared utilities and types (TypeScript)
- `infra/` — Infrastructure and CI/CD configs

## Prerequisites
- [Node.js](https://nodejs.org/) >= 16.x
- [Yarn](https://yarnpkg.com/) >= 1.22.x
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Environment Variables
Copy `.env.example` to `.env` and fill in required secrets:

```
NODE_ENV=development
PORT=4000
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

## Local Development (with Docker)
1. Copy `.env.example` to `.env` and fill in secrets.
2. Run:
   ```sh
   yarn install
   yarn start
   ```
   This will start both frontend (http://localhost:3000) and backend (http://localhost:4000) using Docker Compose.

## Running Frontend and Backend Separately
- **Frontend:**
  ```sh
  yarn workspace frontend dev
  ```
- **Backend:**
  ```sh
  yarn workspace backend dev
  ```

## Build and Test Commands
- **Build all:**
  ```sh
  yarn build
  ```
- **Test:**
  ```sh
  yarn test
  ```
- **Lint:**
  ```sh
  yarn lint
  ```

## Code Style and Linting
- ESLint and Prettier are configured for consistent code style.
- Run `yarn lint` to check code quality.

## API Endpoints Overview
- All backend API routes are served from `http://localhost:4000/api`.
- See `backend/src/routes/api.ts` for details.

## Authentication and Security Notes
- JWT-based authentication.
- Session secrets and JWT secrets must be set in `.env`.
- CORS is configured via `CORS_ORIGIN`.

## CI/CD and Deployment
- GitHub Actions workflow in `infra/github/workflows/ci.yml` for linting, testing, and building.
- Production deployments should add a database service and configure secrets securely.
