# AI App SaaS

## Project Overview
A monorepo SaaS application featuring a React + TypeScript frontend, a Node.js + Express backend, and shared TypeScript code. Infra tooling ensures code quality and streamlined developer experience.

## Monorepo Structure
- `frontend/` – React app (Vite, TailwindCSS)
- `backend/` – Node.js Express API
- `shared/` – Shared types and utilities
- `infra/` – Linting, formatting, CI/CD configs

## Tech Stack
- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Backend:** Node.js, Express, TypeScript
- **Shared:** TypeScript types & utilities
- **Tooling:** ESLint, Prettier, GitHub Actions, Docker Compose

## Getting Started
1. Clone the repo:
   ```sh
   git clone https://github.com/AnouarY02/ai-app-saas.git
   cd ai-app-saas
   ```
2. Install dependencies (monorepo root):
   ```sh
   npm install
   ```
3. Copy environment variables:
   ```sh
   cp .env.example .env
   ```
4. Start development servers:
   ```sh
   npm run dev
   ```

## Development Workflow
- Code resides in `frontend/`, `backend/`, and `shared/`.
- Use `npm run dev` to start both frontend and backend concurrently.
- Lint and format code before committing.

## Scripts Reference
- `npm run dev` – Start frontend and backend in development mode
- `npm run build` – Build all workspaces
- `npm run lint` – Lint all code
- `npm run format` – Format all code
- `npm start` – Start backend server from built output

## Environment Variables
See `.env.example` for required and optional variables:
- `PORT` (required): Port for backend server (default: 4000)
- `NODE_ENV` (optional): Node environment (default: development)
- `FRONTEND_URL` (optional): Frontend URL (default: http://localhost:3000)

## Docker Usage
1. Build and run with Docker Compose:
   ```sh
   cp .env.example .env
   docker-compose up --build
   ```
2. Frontend: http://localhost:3000
3. Backend API: http://localhost:4000

## CI/CD Overview
- Automated lint, build, and test via GitHub Actions (`infra/.github/workflows/ci.yml`).
- PRs and pushes to `main` trigger CI pipeline.

## Contributing
- Fork the repo, create a feature branch, and submit a PR.
- Ensure code passes lint and format checks.

## License
MIT
