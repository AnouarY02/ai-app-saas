# ai-app

## Project Overview
A monorepo SaaS AI application with a React (Vite) frontend and a NestJS backend, managed with TypeScript and PNPM workspaces.

## Monorepo Structure
- `frontend/` – React + Vite frontend app
- `backend/` – NestJS API backend
- `shared/` – Shared TypeScript code (types, utilities)
- `infra/` – Infrastructure configs and scripts

## Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [pnpm](https://pnpm.io/) (v8+ recommended)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Installation & Dependency Fix
1. Clone the repo:
   ```sh
   git clone https://github.com/AnouarY02/ai-app-saas.git
   cd ai-app-saas
   ```
2. Install dependencies (with fix for known issues):
   ```sh
   pnpm install
   pnpm run install:fix
   ```

## Running the App (Local & Docker)

### Locally (with PNPM):
- Start all apps in dev mode:
  ```sh
  pnpm dev
  ```
  - Frontend: http://localhost:3000
  - Backend: http://localhost:4000

### With Docker Compose:
1. Copy environment variables:
   ```sh
   cp .env.example .env
   ```
2. Build & run containers:
   ```sh
   docker-compose up --build
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

## Available Scripts
- `pnpm dev` – Run all apps in development mode
- `pnpm build` – Build all apps
- `pnpm start` – Start all apps in production mode
- `pnpm lint` – Lint all code
- `pnpm format` – Format all code
- `pnpm install:fix` – Run dependency fix script

## Environment Variables
See `.env.example` for optional variables:
- `FRONTEND_PORT` (default: 3000)
- `BACKEND_PORT` (default: 4000)
- `NODE_ENV` (default: development)

## Code Structure
- Frontend and backend each have their own `package.json`, `tsconfig.json`, and source directories.
- Shared code (types, utilities) lives in `shared/` and is imported by both frontend and backend.

## Contributing
1. Fork the repo and create a feature branch.
2. Run `pnpm install` and `pnpm dev` to start developing.
3. Lint and format code before submitting PRs.

## Troubleshooting
- If you encounter dependency issues, run:
  ```sh
  pnpm run install:fix
  ```
- For Docker issues, ensure Docker is running and ports 3000/4000 are free.
- For more, see `infra/README.md`.
