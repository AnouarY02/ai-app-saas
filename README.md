# SaaS CRM

## Project Overview
A modern SaaS CRM application with a React + Chakra UI frontend and a Node.js/Express backend, managed as a TypeScript monorepo. Includes shared types and validation logic.

## Monorepo Structure
- `frontend/` — React + Chakra UI app (TypeScript)
- `backend/` — Node.js + Express API (TypeScript)
- `shared/` — Shared types, API client, and validation utilities
- `infra/` — Tooling configs (ESLint, Prettier, etc.)

## Tech Stack
- **Frontend:** React, Chakra UI, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (Dockerized)
- **Shared:** Types, API client, validation (zod)
- **Tooling:** ESLint, Prettier, Docker Compose, Yarn Workspaces

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
See `.env.example` for all required and optional environment variables:
- `NODE_ENV`, `PORT`, `JWT_SECRET`, `DATABASE_URL` (**required**)
- `FRONTEND_URL`, `BACKEND_URL`, `LOG_LEVEL`, `COOKIE_DOMAIN` (**optional**)

## Running Locally
- **Dev mode (with hot reload):**
  ```sh
  yarn dev
  ```
- **Build all:**
  ```sh
  yarn build
  ```
- **Start backend only:**
  ```sh
  yarn start
  ```

## Docker Usage
- **Start all services (frontend, backend, db):**
  ```sh
  cp .env.example .env
  docker-compose up --build
  ```
- **Stop services:**
  ```sh
  docker-compose down
  ```

## Scripts Reference
- `yarn dev` — Run frontend and backend in dev mode concurrently
- `yarn build` — Build both frontend and backend
- `yarn start` — Start backend (production mode)
- `yarn lint` — Lint all code
- `yarn format` — Format all code with Prettier

## API Overview
- RESTful endpoints for contacts, deals, authentication
- See `backend/src/routes/` for details

## Shared Types and Validation
- Shared TypeScript types: `shared/types/`
- Shared validation utilities: `shared/utils/`
- Shared API client: `shared/apiClient.ts`

## Code Quality and Formatting
- **Lint:**
  ```sh
  yarn lint
  ```
- **Format:**
  ```sh
  yarn format
  ```
- ESLint and Prettier configs in `infra/`

## Deployment Notes
- Configure environment variables for production
- Use Docker Compose or deploy containers separately
- Database migrations and backups are recommended for production
