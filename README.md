# SaaS CRM

## Project Overview
A modern SaaS CRM platform for managing contacts, deals, and sales pipelines. Built as a TypeScript monorepo with shared models and utilities.

## Features
- Contact and deal management
- User authentication (JWT)
- Dashboard with metrics and pipeline
- RESTful API (Express)
- React frontend with Redux Toolkit
- Shared TypeScript models/utilities

## Tech Stack
- **Frontend:** React, TypeScript, Redux Toolkit
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (via Docker)
- **Monorepo:** npm workspaces
- **Testing:** Jest
- **Linting/Formatting:** ESLint, Prettier

## Monorepo Structure
- `frontend/` — React app (TypeScript)
- `backend/` — Express API (TypeScript)
- `shared/` — Shared models and utilities
- `infra/` — Linting, formatting, CI/CD configs

## Getting Started

### Prerequisites
- Node.js v18+
- npm v8+
- Docker & Docker Compose

### Installation
1. Clone the repo:
   ```sh
   git clone https://github.com/AnouarY02/ai-app-saas.git
   cd ai-app-saas
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy and configure environment variables:
   ```sh
   cp .env.example .env
   # Edit .env as needed
   ```

## Environment Variables
See `.env.example` for all required and optional variables:
- `NODE_ENV`, `PORT`, `DATABASE_URL`, `JWT_SECRET` (required)
- `FRONTEND_URL`, `BACKEND_URL`, `LOG_LEVEL`, `CORS_ORIGIN` (optional)

## Running Locally

### With Docker Compose
```sh
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Database: localhost:5432 (Postgres)

### Without Docker
```sh
npm run dev
```
- Starts both frontend and backend in dev mode.

## Scripts
- `npm run dev` — Start frontend & backend concurrently (dev mode)
- `npm run build` — Build all workspaces
- `npm run lint` — Lint all code
- `npm test` — Run all tests
- `npm start` — Start backend API (production)

## API Overview
- RESTful endpoints for contacts, deals, and authentication
- See `backend/src/routes/` for details

## Authentication
- JWT-based authentication
- Login/register via `/api/auth`
- Protect routes with JWT in `Authorization` header

## Deployment Notes
- Use Docker Compose for local/prod deployments
- Configure environment variables for production
- Database migrations/seeding handled via backend scripts (see backend/README.md)

## Contributing
1. Fork the repo
2. Create a feature branch
3. Commit and push your changes
4. Open a pull request

## License
MIT
