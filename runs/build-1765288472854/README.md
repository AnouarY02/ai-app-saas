# ai-app-saas

## Project Overview
A modern SaaS AI application monorepo with separate frontend (React + Vite), backend (Express), and shared code, designed for scalable development and deployment.

## Monorepo Structure
- `frontend/` — React + Vite frontend app (TypeScript)
- `backend/` — Express backend API (TypeScript)
- `shared/` — Shared utilities and types (TypeScript)
- `infra/` — Infrastructure configs and scripts

## Tech Stack
- **Frontend:** React, Vite, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Shared:** Utilities and types in TypeScript
- **Tooling:** ESLint, Prettier, Vitest, Docker, pnpm workspaces

## Getting Started
1. **Install pnpm:**
   ```sh
   npm install -g pnpm
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   ```
3. **Copy environment variables:**
   ```sh
   cp .env.example .env
   # Edit .env as needed
   ```

## Environment Variables
Required:
- `NODE_ENV` (e.g. development, production)
- `PORT` (e.g. 3000)
- `SESSION_SECRET` (your session secret)

Optional:
- `FRONTEND_URL` (default: http://localhost:5173)
- `BACKEND_URL` (default: http://localhost:3000)
- `LOG_LEVEL` (default: info)

## Running Locally (Dev)
- **Start both frontend and backend:**
  ```sh
  pnpm dev
  ```
- Or run each separately:
  ```sh
  pnpm --filter frontend dev
  pnpm --filter backend dev
  ```

## Building for Production
- **Build all apps:**
  ```sh
  pnpm build
  ```
- The output will be in `frontend/dist` and `backend/dist`.

## Docker & Deployment
- **Start with Docker Compose:**
  ```sh
  pnpm start
  # or
  docker-compose up --build
  ```
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

## Scripts Reference
- `pnpm dev` — Start frontend and backend in dev mode
- `pnpm build` — Build frontend and backend
- `pnpm start` — Start both via Docker Compose
- `pnpm test` — Run tests (Vitest)
- `pnpm lint` — Lint all code
- `pnpm typecheck` — TypeScript type checking

## Shared Code & Types
- Import utilities and types from the `shared/` package in both frontend and backend.
- Ensure all packages are built before running production builds.

## API Overview
- All backend API routes are under `/api`.
- See `backend/src/routes/api.ts` for endpoints.

## Authentication & Security
- Session secret is required (`SESSION_SECRET`).
- CORS is configured to allow requests from `FRONTEND_URL`.
- Use HTTPS and secure secrets in production.

## Contributing
1. Fork and clone the repo
2. Create a new branch
3. Make changes and add tests
4. Run `pnpm lint` and `pnpm test`
5. Open a pull request

## Troubleshooting & FAQ
- **Ports in use?** Stop other apps using 3000/5173.
- **Docker issues?** Ensure Docker Desktop is running.
- **Env issues?** Double-check your `.env` file.
