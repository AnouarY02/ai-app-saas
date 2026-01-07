# ai-app

## Project Overview
A full-stack AI SaaS application monorepo, featuring a React + Vite + TypeScript frontend and a Node.js + Express + TypeScript backend, with shared modules and infrastructure tooling.

## Monorepo Structure
- `frontend/` – React + Vite + TypeScript frontend
- `backend/` – Node.js + Express + TypeScript backend
- `shared/` – Shared TypeScript modules (types, utils, constants)
- `infra/` – Infrastructure scripts and tooling

## Tech Stack
- **Frontend:** React, Vite, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Monorepo:** npm workspaces
- **Tooling:** ESLint, Prettier, Docker, Docker Compose

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 8.x
- Docker & Docker Compose (for containerized development)

### Installation
1. Clone the repository:
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

## Local Development

### With Docker
Start both frontend and backend using Docker Compose:
```sh
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

### Without Docker
Start backend and frontend in parallel:
```sh
npm run dev
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## Environment Variables
See `.env.example` for all required and optional environment variables:
- `PORT` (required): Backend server port (default: 4000)
- `VITE_API_BASE_URL` (required): API base URL for frontend
- `NODE_ENV` (optional): Node environment (default: development)
- `LOG_LEVEL` (optional): Logging level (default: info)

## Scripts and Tooling
- `npm run dev` – Start frontend and backend concurrently (non-Docker)
- `npm run build` – Build all workspaces
- `npm run lint` – Lint all TypeScript/JavaScript code
- `npm run format` – Format codebase with Prettier
- `npm run start:frontend` – Start frontend only
- `npm run start:backend` – Start backend only
- `npm run deploy` – Run deployment script (see infra/scripts/deploy.ts)

## Deployment Guide
- Use Docker Compose for local or production-like deployments.
- For custom deployments, see `infra/scripts/deploy.ts` and adapt as needed.

## Contributing
1. Fork the repo and create your branch from `main`.
2. Ensure code passes lint and formatting checks.
3. Open a pull request with a clear description.

## License
MIT
