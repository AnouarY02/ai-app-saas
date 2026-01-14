# Padel Club Manager

## Project Overview
Padel Club Manager is a modern SaaS platform for managing padel clubs, bookings, courts, and users. Built as a TypeScript monorepo with a Next.js frontend and an Express/Prisma backend.

## Monorepo Structure
- `frontend/` – Next.js (React, TypeScript, Tailwind CSS) SPA
- `backend/` – Node.js (Express, TypeScript, Prisma, PostgreSQL)
- `shared/` – Shared types, utilities, and constants
- `infra/` – Infrastructure scripts and automation

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL
- **Shared:** TypeScript types/utilities
- **Infra:** Docker Compose, PostgreSQL, ESLint, Prettier, Jest

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
See `.env.example` for all required and optional environment variables:
- `DATABASE_URL` (required)
- `JWT_SECRET` (required)
- `NEXT_PUBLIC_API_URL` (required)
- `PORT`, `NODE_ENV`, `LOG_LEVEL`, `FRONTEND_URL`, `ADMIN_EMAIL` (optional)

## Running Locally (Dev)
- Start both frontend and backend with hot reload:
  ```sh
  yarn dev
  ```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000](http://localhost:4000)

## Running with Docker
- Build and run all services (frontend, backend, db):
  ```sh
  yarn start
  # or
  docker-compose up --build
  ```
- Stop services:
  ```sh
  docker-compose down
  ```

## Database Migrations
- Run migrations (locally or in Docker):
  ```sh
  yarn migrate
  # or
  docker-compose exec backend yarn prisma migrate deploy
  ```

## Testing
- Run tests for all workspaces:
  ```sh
  yarn test
  ```

## Scripts Reference
| Script      | Description                                 |
|-------------|---------------------------------------------|
| dev         | Start frontend & backend in dev mode        |
| build       | Build frontend & backend                    |
| start       | Start all services via Docker Compose       |
| test        | Run all tests (frontend & backend)          |
| migrate     | Run backend DB migrations                   |
| lint        | Lint all TypeScript/JavaScript code         |

## Deployment
- Use `docker-compose` for production deployments.
- See `infra/` for CI/CD and migration scripts.

## Contributing
Pull requests and issues are welcome! Please lint and test your code before submitting.

## License
MIT
