# AI App Monorepo

## Project Overview
A monorepo for an AI SaaS application, featuring a React frontend, Node.js/Express backend, and shared TypeScript contracts/utilities. Dockerized for easy development and deployment.

## Monorepo Structure
- `frontend/` – React app (TypeScript)
- `backend/` – Express API (TypeScript)
- `shared/` – Shared TypeScript types and utilities
- `infra/` – Infrastructure scripts and CI/CD configs

## Prerequisites
- [Node.js](https://nodejs.org/) >= 16.x
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (Workspaces support)
- [Docker](https://www.docker.com/get-started)

## Environment Variables
Copy `.env.example` to `.env` and fill in required values:

```
NODE_ENV=development
PORT=4000
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:4000
LOG_LEVEL=info
```

## Installation
```sh
yarn install
```

## Running Locally (Dev)
```sh
yarn dev
```
- Starts backend (port 4000) and frontend (port 3000) concurrently.

## Building for Production
```sh
yarn build
```
- Builds shared, backend, and frontend packages.

## Running with Docker
```sh
cp .env.example .env
docker-compose up --build
```
- Access frontend at [http://localhost:3000](http://localhost:3000)
- Backend API at [http://localhost:4000](http://localhost:4000)

## API Endpoints Overview
See `backend/src/routes/api.ts` for available endpoints.

## Shared Contracts & Utilities
Shared types and utilities are in `shared/` and imported by both frontend and backend.

## Testing
```sh
yarn test
```
- Runs tests across the monorepo (requires test scripts in each package).

## Troubleshooting & FAQ
- Ensure all required env variables are set in `.env`.
- If ports are in use, change `PORT` and update docker-compose accordingly.
- For Docker issues, ensure Docker Desktop is running and up to date.
