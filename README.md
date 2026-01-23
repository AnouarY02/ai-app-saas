# TaskManager

## Project Overview
TaskManager is a full-stack monorepo SaaS application for managing tasks, built with Next.js (frontend), Express (backend), and PostgreSQL (database). The stack is TypeScript throughout and ready for cloud-native deployment.

## Monorepo Structure
- `frontend/` – Next.js 14 app (TypeScript, Tailwind CSS)
- `backend/` – Express API server (TypeScript)
- `shared/` – Shared types and utilities (TypeScript)
- `infra/` – Infrastructure as code (Docker, Kubernetes, scripts)

## Prerequisites
- [Node.js](https://nodejs.org/) >= 18.x
- [Yarn](https://yarnpkg.com/) (workspaces support)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Environment Variables
Copy `.env.example` to `.env` and fill in any secrets or overrides as needed.

```
cp .env.example .env
```

- `DATABASE_URL` (required): Postgres connection string
- `JWT_SECRET` (required): Secret for JWT signing
- `NEXT_PUBLIC_API_URL` (required): Backend API URL for frontend
- `PORT`, `NODE_ENV`, `LOG_LEVEL`, `FRONTEND_URL`, `CORS_ORIGIN` (optional)

## Local Development (with Docker Compose)
Start the full stack (frontend, backend, database) with:

```
yarn start
```
Or directly:
```
docker-compose up --build
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)
The backend API will be at [http://localhost:4000](http://localhost:4000)

## Running Frontend and Backend Separately
You can run frontend and backend in dev mode (with hot reload) using:

```
yarn dev
```

Or run each workspace individually:
```
yarn workspace backend dev
# in another terminal
yarn workspace frontend dev
```

## Database Setup and Migrations
The database is provisioned via Docker Compose. To run migrations:

```
yarn migrate
```

## Seeding Sample Data
To seed the database with sample data:

```
yarn seed
```

## Scripts Reference
- `yarn dev` – Run frontend and backend in dev mode concurrently
- `yarn build` – Build both frontend and backend
- `yarn start` – Start all services via Docker Compose
- `yarn lint` – Lint all code
- `yarn typecheck` – TypeScript project references check
- `yarn migrate` – Run DB migrations
- `yarn seed` – Seed sample data
- `yarn test` – Run tests (placeholder)

## Testing
Test scripts are placeholders. Add your tests in the respective workspaces.

## Deployment (Docker/Kubernetes)
- **Docker Compose**: For local/dev use (`docker-compose.yml` at root)
- **Kubernetes**: See manifests in `infra/k8s/` for cloud deployment

## API Reference
See backend and shared documentation for API contracts and endpoints.

## Contributing
Pull requests are welcome! Please lint and typecheck before submitting.

## License
MIT
