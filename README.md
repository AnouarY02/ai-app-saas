# Padel Club Manager

## Project Overview

Padel Club Manager is a modern SaaS platform for managing padel clubs, projects, teams, and productivity metrics. It features a Kanban board, team management, analytics, notifications, and more.

## Features

- User authentication and profile management
- Team and project management
- Kanban board with drag-and-drop
- Task and comment system
- Activity feed and notifications
- Productivity analytics dashboard
- Responsive UI with Tailwind CSS and shadcn/ui

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Context & useReducer
- In-memory stores (MVP)
- Jest & Supertest (testing)
- ESLint & Prettier (linting/formatting)

## Monorepo Structure

- `frontend/` – Next.js frontend (App Router, UI, context)
- `backend/` – Next.js API endpoints, in-memory stores
- `shared/` – Shared types, constants, utilities
- `infra/` – Tooling configs (ESLint, Tailwind, Jest, etc.)

## Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/AnouarY02/ai-app-saas.git
   cd ai-app-saas
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Copy environment variables:**
   ```sh
   cp .env.example .env
   ```
4. **Run the app locally:**
   ```sh
   npm run dev
   ```

## Environment Variables

See `.env.example` for required and optional environment variables:
- `NEXTAUTH_SECRET` (required)
- `NEXTAUTH_URL` (required)
- `SESSION_SECRET` (required)
- `NODE_ENV`, `PORT`, `LOG_LEVEL`, `API_BASE_URL` (optional)

## Development Workflow

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Lint codebase
- `npm run typecheck` – TypeScript type checking
- `npm run test` – Run tests
- `npm run format` – Format code with Prettier

## Running Locally

- **With Docker Compose:**
  ```sh
  cp .env.example .env
  docker-compose up --build
  ```
- **Without Docker:**
  ```sh
  npm install
  npm run dev
  ```

## Running Tests

- Run all tests:
  ```sh
  npm run test
  ```
- Watch mode:
  ```sh
  npm run test:watch
  ```

## Building for Production

```sh
npm run build
npm run start
```

## Linting & Formatting

- Lint: `npm run lint`
- Format: `npm run format`
- Typecheck: `npm run typecheck`

## Deployment

- Deploy with Docker Compose or to Vercel/your preferred cloud provider.
- Ensure all required environment variables are set in production.

## API Reference

- RESTful API under `/api/` endpoints (see backend/app/api/)
- Auth, teams, projects, boards, tasks, comments, notifications, metrics

## Shared Types & Contracts

- Shared types and constants in `shared/`
- Use these for consistent typing across frontend and backend

## Extending & Customizing

- Add persistent storage by introducing a database service
- Extend API endpoints as needed
- Customize UI via Tailwind and shadcn/ui

## Troubleshooting & FAQ

- **Ports in use?** Stop conflicting processes or change `PORT` in `.env` and `docker-compose.yml`.
- **Env issues?** Ensure `.env` is present and filled out.
- **Build errors?** Run `npm install` and check Node.js version (>=18).

## License

MIT License
