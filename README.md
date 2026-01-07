# AI App SaaS Monorepo

## Project Overview
A scalable AI SaaS application structured as a monorepo. Includes a React (Vite, TypeScript) frontend, Node.js (Express, TypeScript) backend, and shared utilities.

## Monorepo Structure
- `frontend/` — React + Vite app (TypeScript)
- `backend/` — Express API server (TypeScript)
- `shared/` — Shared TypeScript types and utilities
- `infra/` — Infrastructure, CI/CD, linting, and formatting configs

## Prerequisites
- Node.js (>=16)
- npm (>=8)
- Docker & Docker Compose (for containerized development)

## Environment Variables
Copy `.env.example` to `.env` and fill in the required values:

**Required:**
- `NODE_ENV` — Environment (`development`, `production`)
- `PORT` — Backend server port
- `SESSION_SECRET` — Session secret for backend
- `JWT_SECRET` — JWT secret for authentication

**Optional:**
- `FRONTEND_URL` — URL for frontend (default: http://localhost:5173)
- `BACKEND_URL` — URL for backend (default: http://localhost:3000)
- `LOG_LEVEL` — Logging level (e.g., info, debug)
- `CORS_ORIGIN` — Allowed CORS origin

## Local Development
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start both frontend and backend with live reload:
   ```sh
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## Building for Production
Build both frontend and backend:
```sh
npm run build
```

## Running with Docker
1. Copy `.env.example` to `.env` and set secrets.
2. Build and start containers:
   ```sh
   docker-compose up --build
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## Testing
Run all tests:
```sh
npm test
```

## Linting and Formatting
- Lint code:
  ```sh
  npm run lint
  ```
- Format code:
  ```sh
  npm run format
  ```

## API Reference
See backend API route definitions in `backend/src/routes/api.ts`.

## Troubleshooting
- Ensure all required environment variables are set.
- Check Docker logs with `docker-compose logs` for errors.
- If ports are in use, adjust `PORT` and `FRONTEND_URL`/`BACKEND_URL`.

## Contributing
1. Fork the repo and create a feature branch.
2. Follow code style using ESLint and Prettier.
3. Submit a pull request with a clear description.
