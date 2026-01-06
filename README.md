# ai-app SaaS Monorepo

## Project Overview
A SaaS AI application with a React frontend and a Node.js (Express) backend, written in TypeScript. The monorepo structure enables shared code and types between frontend and backend for maximum productivity and type safety.

## Monorepo Structure
- `frontend/` – React + TypeScript UI
- `backend/` – Node.js + Express API (TypeScript)
- `shared/` – Shared types and utilities (TypeScript)
- `infra/` – Infrastructure, configs, and tooling

## Prerequisites
- [Node.js](https://nodejs.org/) >= 18.x
- [Yarn](https://classic.yarnpkg.com/) (workspaces support)
- Docker & Docker Compose (for containerized development)

## Environment Variables
Create a `.env` file in the root directory. Example:

```
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:3001
# Optional
BACKEND_URL=http://localhost:3000
LOG_LEVEL=info
SESSION_EXPIRY_MINUTES=60
```

**Required:**
- `NODE_ENV` – Node environment (development/production)
- `PORT` – Port for backend API
- `JWT_SECRET` – Secret for JWT signing
- `FRONTEND_URL` – URL where frontend is served

**Optional:**
- `BACKEND_URL` – API endpoint for frontend
- `LOG_LEVEL` – Logging verbosity
- `SESSION_EXPIRY_MINUTES` – Session expiry duration

## Local Development (Yarn/NPM)
Install dependencies:

```
yarn install
```

Start both frontend and backend in dev mode:

```
yarn dev
```

Or start individually:

```
yarn start:frontend
# or
yarn start:backend
```

Build all packages:

```
yarn build
```

## Running with Docker Compose
1. Copy `.env.example` to `.env` and fill in the secrets.
2. Build and start all services:

```
yarn docker:up
```

- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend: [http://localhost:3000](http://localhost:3000)

Stop services:

```
yarn docker:down
```

## Scripts Reference
- `yarn dev` – Start frontend and backend in dev mode
- `yarn build` – Build all workspaces
- `yarn lint` – Lint all code
- `yarn test` – Run all tests
- `yarn start:frontend` – Start frontend only
- `yarn start:backend` – Start backend only
- `yarn docker:up` – Start all services with Docker Compose
- `yarn docker:down` – Stop all Docker Compose services

## API Overview
The backend exposes RESTful endpoints for AI operations and authentication. See `backend/src/routes/api.ts` and `backend/src/controllers/aiController.ts` for details.

## Frontend Overview
The frontend is a React app using TypeScript and React Router. API calls are made via `frontend/src/utils/apiClient.ts`.

## Testing
Run all tests (frontend, backend, shared):

```
yarn test
```

## Linting & Formatting
- Lint code:
  ```
  yarn lint
  ```
- Format code (Prettier):
  ```
  yarn prettier --write .
  ```

## Deployment Notes
- Use Docker Compose for local dev and simple deployments.
- For production, build images and deploy via your preferred orchestrator (Kubernetes, ECS, etc).
- Ensure secrets are set via environment variables.

## Troubleshooting
- Ensure all required environment variables are set in `.env`.
- If ports are in use, update `PORT` and `FRONTEND_URL` accordingly.
- For dependency issues, try `yarn install --force`.
