# Padel Club Manager

## Project Overview
Padel Club Manager is a monorepo SaaS application for managing padel clubs, built with React (TypeScript) for the frontend and Node.js/Express (TypeScript) for the backend. The project is structured for scalability, maintainability, and developer productivity.

## Monorepo Structure
- `frontend/` – React + TypeScript frontend
- `backend/` – Node.js + Express + TypeScript backend
- `shared/` – Shared TypeScript types and utilities
- `infra/` – Infrastructure, linting, formatting, and configuration files

## Prerequisites
- Node.js (>= 16.x recommended)
- npm (>= 8.x recommended)
- Docker & Docker Compose (for containerized workflow)

## Local Development

### Without Docker
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start development servers for frontend and backend:
   ```sh
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

### With Docker
1. Copy environment example:
   ```sh
   cp .env.example .env
   ```
2. Build and run services:
   ```sh
   docker-compose up --build
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

## Available NPM Scripts
- `npm run dev` – Start both frontend and backend in development mode
- `npm run build` – Build all packages
- `npm run lint` – Run ESLint across all packages
- `npm run format` – Run Prettier formatting
- `npm run start:frontend` – Start frontend service
- `npm run start:backend` – Start backend service

## Code Formatting and Linting
- ESLint and Prettier are configured in `infra/`.
- Run `npm run lint` to check code quality.
- Run `npm run format` to auto-format code.

## Project Configuration
- **TypeScript:** Shared config in `infra/tsconfig.base.json`, extended by each package.
- **ESLint:** See `infra/eslint.json`.
- **Prettier:** See `infra/prettier.json`.

## Docker & Containerized Workflow
- Docker Compose orchestrates the frontend and backend containers.
- Dockerfiles are located in `frontend/` and `backend/` directories.
- To rebuild containers, use:
  ```sh
  docker-compose build
  ```

## Troubleshooting & FAQ
- If ports 3000 or 4000 are in use, stop conflicting services or update the ports in `docker-compose.yml`.
- If you encounter dependency issues, run `npm install` from the root.
- For further questions, see infra/README.md or contact the maintainers.
