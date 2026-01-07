# SaaS CRM

## Project Overview
A modern SaaS CRM application with a React/TypeScript frontend, Node.js/Express backend, PostgreSQL database, and a shared types/utilities workspace. Monorepo structure for seamless full-stack development.

## Monorepo Structure
- `frontend/` — React + TypeScript SPA
- `backend/` — Node.js + Express + TypeScript API server
- `shared/` — Shared types, models, and utilities
- `infra/` — Linting, formatting, and Docker configs

## Tech Stack
- **Frontend:** React, Redux Toolkit, React Router, TypeScript
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL, JWT Auth, TypeScript
- **Shared:** TypeScript types and utilities
- **Tooling:** ESLint, Prettier, Docker, Yarn Workspaces

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
3. **Copy environment variables:**
   ```sh
   cp .env.example .env
   ```

## Environment Variables
See `.env.example` for all required and optional environment variables. Update values as needed for your local/dev/prod setup.

## Running Locally (Dev)
- **Start both frontend and backend:**
  ```sh
  yarn dev
  ```
- **Backend runs on:** http://localhost:4000
- **Frontend runs on:** http://localhost:3000

## Running with Docker
- **Build and start all services (frontend, backend, db):**
  ```sh
  yarn start
  # or
  docker-compose up --build
  ```
- **Stop services:**
  ```sh
  docker-compose down
  ```

## Database Setup & Migrations
- **Apply migrations:**
  ```sh
  yarn db:migrate
  ```
- **Open Prisma Studio:**
  ```sh
  yarn db:studio
  ```

## Scripts & Tooling
- **Lint code:** `yarn lint`
- **Format code:** `yarn format`
- **Run tests:** `yarn test`

## Shared Types & Contracts
- Shared TypeScript types and utilities are in the `shared/` folder and imported by both frontend and backend.

## Testing
- Each workspace may have its own test scripts. Run all tests:
  ```sh
  yarn test
  ```

## Deployment Notes
- Use Docker Compose for production deployments.
- Ensure environment variables are set appropriately in your deployment environment.

## Troubleshooting
- **Ports in use:** Make sure ports 3000 (frontend), 4000 (backend), and 5432 (db) are free.
- **Database connection errors:** Check `DATABASE_URL` and ensure the db service is healthy.
- **Frontend/backend not connecting:** Confirm `FRONTEND_URL` and CORS settings.
