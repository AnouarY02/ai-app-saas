# ai-app

## Project Overview
ai-app is a full-stack SaaS application built as a monorepo with a React (Vite) frontend and a Node.js (Express, TypeScript) backend.

## Monorepo Structure
- `frontend/` – React + Vite app
- `backend/` – Express API (TypeScript)
- `shared/` – Shared code, types, and utilities
- `infra/` – Infra tooling and configuration

## Prerequisites
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) & [pnpm](https://pnpm.io/) (for local non-docker dev)

## Environment Variables
Copy and edit the example env file:

```sh
cp .env.example .env
```

Required:
- `NODE_ENV` (default: production)
- `PORT` (backend port)
- `JWT_SECRET` (JWT signing secret)
- `SESSION_EXPIRY` (e.g. 1d, 3600s)
- `VITE_BACKEND_URL` (frontend → backend URL)

## Local Development (with Docker)

```sh
cp .env.example .env
docker compose up -d --build
```

- Test backend health:
  ```sh
  curl http://localhost:4000/health
  ```
- Open frontend:
  - [http://localhost:3000](http://localhost:3000)

## Local Development (without Docker)
- Install dependencies: `pnpm install`
- Start all apps: `pnpm dev`

## Build and Production Deployment
- Build: `pnpm build`
- Start with Docker Compose as above

## Running Tests
- `pnpm test`

## Scripts Reference
- `pnpm dev` – Start frontend & backend in dev mode
- `pnpm build` – Build frontend & backend
- `pnpm start` – Start both via Docker Compose
- `pnpm test` – Run tests
- `pnpm lint` – Lint codebase
- `pnpm typecheck` – TypeScript type check

## API Overview
- Main API endpoint: `http://localhost:4000/api`
- Health check: `http://localhost:4000/health`

## Shared Contracts and Types
- Shared types and utilities live in `shared/`

## Troubleshooting
- Ensure `.env` is present and filled
- If ports are busy, change `PORT` in `.env` and update compose file accordingly
- Check container logs: `docker compose logs backend` or `frontend`
