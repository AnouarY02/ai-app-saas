# ai-app

## Project Overview
ai-app is a monorepo SaaS application with a React (Vite) frontend and a Node.js (Express) backend, written in TypeScript. The project is containerized for reliable deployment and local development.

## Monorepo Structure
- `frontend/` – React SPA (Vite)
- `backend/` – Express API server
- `shared/` – Shared TypeScript utilities and types
- `infra/` – Infrastructure, CI, linting, and Docker tooling

## Getting Started
1. Copy the example environment variables:
   ```sh
   cp .env.example .env
   ```
2. Build and start the app with Docker Compose:
   ```sh
   docker compose up -d --build
   ```
3. Check backend health:
   ```sh
   curl http://localhost:4000/health
   ```
4. Open the frontend in your browser:
   ```sh
   open http://localhost:3000
   ```

## Local Development
- Run frontend and backend separately for development, or use the provided scripts in each package.

## Building for Production
- Use Docker Compose as above for a production-like environment.

## Running with Docker
- The app runs two services: `frontend` (on port 3000) and `backend` (on port 4000).
- No database or external services are required.

## Environment Variables
- `NODE_ENV` (default: production)
- `VITE_BACKEND_URL` (default: http://backend:4000)
- `PORT_FRONTEND` (set if needed)
- `PORT_BACKEND` (set if needed)

## Scripts and Tooling
- Lint: `pnpm lint` (uses ESLint)
- Build: `pnpm build`
- Dev: `pnpm dev` (concurrently runs frontend and backend)
- Start (Docker): `docker compose up --build`

## Extending the App
- Add more services or infrastructure in `infra/` as needed.
- Extend shared utilities in `shared/`.

## Troubleshooting
- Ensure Docker is running and ports 3000/4000 are free.
- Check logs with `docker compose logs`.
- Health endpoint: `curl http://localhost:4000/health`
