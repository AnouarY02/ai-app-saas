# Task Manager Pro

## Project Overview
Task Manager Pro is a full-stack SaaS application for managing tasks, built with React (frontend), Node.js/Express (backend), and PostgreSQL (database). The monorepo structure enables shared types and utilities across the stack.

## Monorepo Structure
- `frontend/` – React + TypeScript UI
- `backend/` – Express + TypeScript REST API
- `shared/` – Shared types and utilities
- `infra/` – Infrastructure, tooling, and configuration

## Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [pnpm](https://pnpm.io/) (v8+ recommended)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Environment Variables
Copy `.env.example` to `.env` and fill in the required values:

```
cp .env.example .env
```

- `NODE_ENV` (required)
- `PORT` (required)
- `JWT_SECRET` (required)
- `DATABASE_URL` (required)
- `FRONTEND_URL` (optional)
- `BACKEND_URL` (optional)
- `CORS_ORIGIN` (optional)
- `LOG_LEVEL` (optional)

## Installation
Install dependencies for all packages using pnpm:

```
pnpm install
```

## Running Locally (Dev)
Start all apps in development mode:

```
pnpm dev
```

Or run frontend/backend individually:

```
pnpm --filter frontend dev
pnpm --filter backend dev
```

## Building for Production
Build all packages:

```
pnpm build
```

## Running with Docker
Build and run the full stack using Docker Compose:

```
docker-compose up --build
```

The frontend will be available at [http://localhost:3000](http://localhost:3000), backend at [http://localhost:4000](http://localhost:4000).

## Scripts Reference
- `pnpm dev` – Start all packages in development mode
- `pnpm build` – Build all packages
- `pnpm start` – Start all packages in production mode
- `pnpm lint` – Lint all packages
- `pnpm format` – Format all packages
- `pnpm test` – Run tests for all packages

## API Overview
The backend exposes a REST API for task management. See `backend/README.md` for endpoint documentation.

## Shared Types & Contracts
Shared TypeScript types and utilities are located in the `shared/` package for type-safe communication between frontend and backend.

## Code Quality (Linting & Formatting)
- ESLint and Prettier are configured for consistent code style.
- Run `pnpm lint` and `pnpm format` at the root to check/format codebase-wide.

## Contributing
1. Fork the repo and create a feature branch.
2. Make your changes and add tests.
3. Run lint and format scripts before submitting a PR.
4. Submit a pull request for review.

## License
MIT
