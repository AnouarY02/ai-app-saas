# Test App

## Project Overview
A monorepo SaaS application with a React frontend, Express backend, and shared TypeScript utilities. Infrastructure and developer tooling are included for a smooth workflow.

## Monorepo Structure
- `frontend/` – React + TypeScript frontend
- `backend/` – Express + TypeScript backend
- `shared/` – Shared TypeScript utilities
- `infra/` – Infrastructure, linting, and testing configs

## Prerequisites
- Node.js (>=16.x recommended)
- npm (>=8.x recommended)
- Docker & Docker Compose (for containerized workflow)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/AnouarY02/ai-app-saas.git
   cd ai-app-saas
   ```
2. Install dependencies for all workspaces:
   ```sh
   npm install
   ```

## Development Workflow
- Start both frontend and backend in watch mode:
  ```sh
  npm run dev
  ```
- Or run frontend/backend individually:
  ```sh
  npm start --prefix frontend
  npm start --prefix backend
  ```

## Running the App Locally
- With Docker Compose:
  ```sh
  cp .env.example .env
  docker-compose up --build
  ```
- Or manually (see above for dev scripts).

## Building for Production
- Build all packages:
  ```sh
  npm run build
  ```

## Linting and Testing
- Lint all code:
  ```sh
  npm run lint
  ```
- Run all tests:
  ```sh
  npm run test
  ```

## Environment Variables
- See `.env.example` for all environment variables.
- `PORT` – Backend port (default: 4000)
- `FRONTEND_PORT` – Frontend port (default: 3000)

## Docker Usage
- Build and run containers:
  ```sh
  docker-compose up --build
  ```
- Stop containers:
  ```sh
  docker-compose down
  ```

## Troubleshooting
- Ensure all dependencies are installed (`npm install`).
- Check Docker is running if using Docker Compose.
- For port conflicts, adjust `PORT` and `FRONTEND_PORT` in your `.env` file.
