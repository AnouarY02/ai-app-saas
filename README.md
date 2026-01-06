# ai-app

## Project Overview
A modern SaaS monorepo featuring a React (Vite) frontend, Express (TypeScript) backend, and a shared codebase for types and utilities. Built for rapid development and scalability.

## Monorepo Structure
- `frontend/` – React app (Vite, TypeScript)
- `backend/` – Express API (TypeScript)
- `shared/` – Shared types and utilities
- `infra/` – Tooling, configs, and CI/CD

## Getting Started
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Copy environment variables:**
   ```sh
   cp .env.example .env
   ```
3. **Run in development mode:**
   ```sh
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## Environment Variables
- **Required:**
  - `PORT` (e.g., 3000)
- **Optional:**
  - `FRONTEND_PORT` (default: 5173)
  - `NODE_ENV` (default: development)

## Development Workflow
- **Start both apps:** `npm run dev`
- **Start backend only:** `npm start`
- **Build all:** `npm run build`
- **Lint:** `npm run lint`
- **Format:** `npm run format`

## Building for Production
1. Build both frontend and backend:
   ```sh
   npm run build
   ```
2. Start backend server:
   ```sh
   npm start
   ```

## Running with Docker
1. Build and start all services:
   ```sh
   docker-compose up --build
   ```
2. Access frontend at [http://localhost:5173](http://localhost:5173)
3. Access backend at [http://localhost:3000](http://localhost:3000)

## Code Quality and Formatting
- **Lint:** Uses ESLint for TypeScript and React
- **Format:** Uses Prettier (see `infra/prettier.config.js`)
- **Config:** See `infra/` for all tooling configs

## Extending the App
- Add new shared utilities/types in `shared/`
- Add new frontend features in `frontend/`
- Add new API endpoints in `backend/`
