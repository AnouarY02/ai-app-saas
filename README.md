# ai-app Monorepo

## Project Overview
A modern SaaS AI application with a React (Vite, TypeScript) frontend and a Node.js (Express, TypeScript) backend. Monorepo structure for shared utilities and consistent tooling.

## Monorepo Structure
- `frontend/` — React + Vite frontend app (TypeScript)
- `backend/` — Express API server (TypeScript)
- `shared/` — Shared TypeScript utilities and types
- `infra/` — Tooling, configs, CI/CD, and Docker

## Prerequisites
- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) v8+
- [Docker](https://www.docker.com/) (for containerized workflow)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/AnouarY02/ai-app-saas.git
   cd ai-app-saas
   ```
2. Install dependencies (monorepo):
   ```sh
   pnpm install
   ```

## Development Workflow
- Start backend:
  ```sh
  pnpm run dev:backend
  ```
- Start frontend:
  ```sh
  pnpm run dev:frontend
  ```
- Both frontend and backend will reload on code changes.

## Building the App
- Build all packages:
  ```sh
  pnpm run build
  ```
- Or build individually:
  ```sh
  pnpm run build:shared
  pnpm run build:backend
  pnpm run build:frontend
  ```

## Running in Docker
- Build and run both frontend and backend:
  ```sh
  docker-compose up --build
  ```
- Access frontend at [http://localhost:5173](http://localhost:5173)
- Backend API runs at [http://localhost:3000](http://localhost:3000)

## Environment Variables
Copy `.env.example` to `.env` and adjust as needed:

Required:
- `PORT` — Port for backend server (default: 3000)

Optional:
- `NODE_ENV` — Node environment (default: development)
- `FRONTEND_URL` — URL for frontend (default: http://localhost:5173)

## Linting and Formatting
- Lint code:
  ```sh
  pnpm run lint
  ```
- Check formatting:
  ```sh
  pnpm run format
  ```

## CI/CD
- GitHub Actions workflow is defined in `infra/.github/workflows/ci.yml` for linting, formatting, and building on every push and PR.

## Troubleshooting
- Ensure all dependencies are installed with `pnpm install`.
- If ports are in use, adjust `PORT` and `FRONTEND_URL` in `.env` and `docker-compose.yml`.
- For Docker issues, ensure Docker Desktop is running and you have sufficient resources allocated.
