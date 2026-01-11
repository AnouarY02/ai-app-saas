# Nieuw App Idee

## Project Overview
Nieuw App Idee is a monorepo SaaS application scaffolded with a React (Vite) frontend, Node.js (Express) backend, and shared TypeScript libraries. This repository provides the foundation for rapid full-stack development and deployment.

## Monorepo Structure
- `frontend/` – React + Vite frontend app
- `backend/` – Node.js + Express backend API
- `shared/` – Shared TypeScript code and utilities
- `infra/` – Tooling, configs, and base infrastructure

## Getting Started
1. **Clone the repository**
   ```sh
   git clone https://github.com/AnouarY02/ai-app-saas.git
   cd ai-app-saas
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Copy environment variables**
   ```sh
   cp .env.example .env
   ```

## Development Scripts
- `npm run dev` – Start frontend and backend in development mode (concurrently)
- `npm run start:frontend` – Start only the frontend
- `npm run start:backend` – Start only the backend
- `npm run lint` – Run ESLint across all packages
- `npm run format` – Format codebase with Prettier
- `npm run test` – Run Jest tests

## Building the App
- `npm run build` – Build all packages (frontend, backend, shared)

## Running in Docker
1. **Build and start containers**
   ```sh
   docker-compose up --build
   ```
2. **Frontend:** http://localhost:3000
3. **Backend:** http://localhost:4000

## Code Quality (Linting & Formatting)
- **Lint:** `npm run lint`
- **Format:** `npm run format`
- ESLint and Prettier configs are in `infra/`

## Testing
- **Run tests:** `npm run test`
- Jest config is in `infra/`

## Future Development Notes
- Add database and authentication services
- Expand shared library usage
- Set up CI/CD pipelines
