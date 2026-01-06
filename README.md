# ai-app

## Project Overview
A modern AI SaaS monorepo featuring a React (Vite + TailwindCSS) frontend, a Node.js (Express + TypeScript) backend, and shared utilities. Built for strong typing, developer experience, and rapid iteration.

## Monorepo Structure
- `frontend/` – React app (Vite, TailwindCSS)
- `backend/` – Node.js Express API (TypeScript)
- `shared/` – Shared TypeScript utilities and types
- `infra/` – Infrastructure, configuration, and tooling

## Prerequisites
- [Node.js](https://nodejs.org/) >= 18.x
- [Yarn](https://yarnpkg.com/) (v1 or v3)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Environment Variables
Copy `.env.example` to `.env` and fill in the required values:

**Required:**
- `NODE_ENV` (e.g. development, production)
- `JWT_SECRET` (your JWT signing secret)
- `PORT` (backend port, default: 3000)

**Optional:**
- `FRONTEND_URL` (default: http://localhost:5173)
- `BACKEND_URL` (default: http://localhost:3000)
- `LOG_LEVEL` (e.g. info, debug)

## Local Development

### With Docker
1. Copy `.env.example` to `.env` and edit as needed.
2. Run:
   ```sh
   yarn install
   yarn start
   ```
3. Frontend: http://localhost:5173  
   Backend: http://localhost:3000

### Without Docker
1. Copy `.env.example` to `.env` and edit as needed.
2. Install dependencies:
   ```sh
   yarn install
   ```
3. In one terminal, run:
   ```sh
   yarn dev
   ```
   This starts both frontend and backend concurrently.

## Scripts Reference
- `yarn dev` – Start frontend & backend in dev mode (concurrently)
- `yarn build` – Build both frontend and backend
- `yarn lint` – Lint all code (TypeScript, React)
- `yarn format` – Format codebase with Prettier
- `yarn start` – Start all services via Docker Compose

## Frontend Setup
- Located in `frontend/`
- Built with React, Vite, TailwindCSS
- Dev server runs on port 5173
- See `frontend/README.md` for details

## Backend Setup
- Located in `backend/`
- Node.js, Express, TypeScript
- Dev server runs on port 3000
- See `backend/README.md` for details

## Shared Utilities
- Located in `shared/`
- Common TypeScript types and utilities for both frontend and backend

## Code Quality (Linting & Formatting)
- ESLint config: `infra/.eslintrc.json`
- Prettier config: `infra/.prettierrc`
- Run `yarn lint` and `yarn format` at repo root

## Deployment
- Use Docker Compose for local or production deployment
- Build images with `docker-compose build`
- Start services with `docker-compose up -d`

## Troubleshooting & FAQ
- Ensure all required environment variables are set in `.env`
- If ports are in use, change `PORT` and `FRONTEND_URL`/`BACKEND_URL`
- For dependency issues, run `yarn install` at the repo root
- For more, see infra/README.md
