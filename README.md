# AI App SaaS Monorepo

## Project Overview
A modern SaaS starter with React (Vite) frontend, Node.js (Express) backend, and shared TypeScript code. Managed as a monorepo for developer efficiency.

## Monorepo Structure
- `frontend/` – React app (Vite)
- `backend/` – Express API server
- `shared/` – Shared TypeScript types and utilities
- `infra/` – Tooling, configs, and automation scripts

## Prerequisites
- [Node.js](https://nodejs.org/) >= 18.x
- [pnpm](https://pnpm.io/) (recommended) or npm
- Docker (optional, for containerized dev)

## Environment Variables
Create a `.env` file in the root. Required variables:

```
NODE_ENV=development
PORT=3000
SESSION_SECRET=your-session-secret
```

Optional variables:

```
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000
LOG_LEVEL=info
```

## Installation
1. Clone the repo:
   ```sh
   git clone https://github.com/AnouarY02/ai-app-saas.git
   cd ai-app-saas
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```

## Running Locally
- **With pnpm:**
  ```sh
  pnpm dev
  ```
  - Frontend: http://localhost:5173
  - Backend: http://localhost:3000

- **With Docker Compose:**
  ```sh
  docker-compose up --build
  ```

## Development Workflow
- Code in `frontend/`, `backend/`, or `shared/` as needed.
- Shared code is imported via workspace references.
- Use `pnpm dev` for concurrent local dev.

## Build & Production
- Build all apps:
  ```sh
  pnpm build
  ```
- Start backend (after build):
  ```sh
  pnpm start
  ```
- For production Docker, adjust Dockerfiles and use `docker-compose -f docker-compose.yml up --build`.

## Linting & Formatting
- Lint all code:
  ```sh
  pnpm lint
  ```
- Check formatting:
  ```sh
  pnpm format
  ```
- Configs in `infra/.eslintrc.json` and `infra/.prettierrc`.

## Testing
- Run all tests:
  ```sh
  pnpm test
  ```
- Uses [Vitest](https://vitest.dev/) for unit/integration tests.

## Docker Usage
- Build and run both frontend and backend:
  ```sh
  docker-compose up --build
  ```
- Edit `.env` as needed for secrets and URLs.

## API Endpoints
- All backend API routes are served from `/api` (see `backend/src/routes/api.ts`).
- Example: `GET /api/users`

## Authentication Flow
- Session-based authentication with `SESSION_SECRET`.
- Frontend authenticates via API endpoints; see `frontend/src/hooks/useAuth.ts`.

## Troubleshooting & FAQ
- **Port conflicts?** Stop other apps using 3000/5173 or change `PORT`/`FRONTEND_URL`.
- **Dependency issues?** Try `pnpm install --force`.
- **Docker issues?** Ensure Docker Desktop is running and ports are available.
