# AI App

## Project Overview
A modern AI SaaS application built as a TypeScript-first monorepo, featuring a Next.js frontend, Express backend, and PostgreSQL database. Designed for scalability, developer experience, and strong typing across the stack.

## Monorepo Structure
- `frontend/` — Next.js (React, TypeScript, TailwindCSS) client
- `backend/` — Node.js (Express, TypeScript, PostgreSQL) API server
- `shared/` — Shared types and utilities
- `infra/` — Infrastructure scripts and configs

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, TailwindCSS
- **Backend:** Node.js, Express, TypeScript, PostgreSQL
- **Infra:** Docker Compose, PostgreSQL
- **Dev Tools:** ESLint, Prettier, TypeScript, Zod, dotenv

## Getting Started
1. **Clone the repo:**
   ```sh
   git clone https://github.com/AnouarY02/ai-app-saas.git
   cd ai-app-saas
   ```
2. **Install dependencies:**
   ```sh
   yarn install
   ```
3. **Set up environment variables:**
   ```sh
   cp .env.example .env
   # Edit .env as needed
   ```

## Environment Variables
See `.env.example` for all required and optional variables:
- `DATABASE_URL` (required)
- `JWT_SECRET` (required)
- `SESSION_SECRET` (required)
- `NEXT_PUBLIC_API_URL` (required)
- `PORT`, `NODE_ENV`, `LOG_LEVEL` (optional)

## Local Development (with Docker)
To start the full stack locally (frontend, backend, and database):
```sh
yarn start
# or
NODE_ENV=development docker-compose up --build
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:4000](http://localhost:4000)
- PostgreSQL: localhost:5432 (user: postgres, password: postgres)

## Running Migrations
Run backend DB migrations (from project root):
```sh
yarn db:migrate
```

## Available Scripts
- `yarn dev` — Start frontend & backend in dev mode
- `yarn build` — Build frontend & backend
- `yarn start` — Start all services via Docker Compose
- `yarn lint` — Lint all TypeScript/JavaScript files
- `yarn typecheck` — Run TypeScript project references typecheck
- `yarn db:migrate` — Run backend DB migrations

## API Endpoints Overview
See backend `src/routes/` for available endpoints:
- `/api/*` — AI and app APIs
- `/auth/*` — Authentication endpoints
- `/user/*` — User management

## Authentication & Security
- JWT-based authentication
- Session secrets and secure cookie handling
- Environment-based configuration

## Deployment Notes
- Use Docker Compose for local and staging deployments
- Set all required environment variables in production
- See `infra/` for infra scripts and DB initialization

## Contributing
1. Fork the repo
2. Create a feature branch
3. Open a PR with clear description

## Troubleshooting
- Ensure Docker is running for local dev
- Check `.env` values if services fail to start
- Use `docker-compose logs` for debugging
