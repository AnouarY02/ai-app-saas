# Padel Club Pro

## Project Overview
A SaaS platform for padel club management, featuring authentication and a modern web stack.

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, JWT, Zod, BcryptJS, Dotenv, CORS
- **Frontend:** React, React Router DOM, Axios
- **Dev Tools:** Nodemon, ts-node, Typescript, Jest, ESLint
- **Containerization:** Docker, Docker Compose

## Getting Started
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

## Environment Variables
- `JWT_SECRET` (required): Secret key for JWT authentication
- `PORT` (required): Backend server port (default: 4000)
- `NODE_ENV` (optional): Node environment (default: development)
- `FRONTEND_URL` (optional): URL where frontend is served
- `BACKEND_URL` (optional): URL where backend is served

## Running Locally
- **Backend:**
  ```sh
  cd backend
  npm install
  npm run dev
  ```
- **Frontend:**
  ```sh
  cd frontend
  npm install
  npm start
  ```

## Available Scripts
- `npm run dev` – Start backend with live reload (nodemon + ts-node)
- `npm run build` – Compile TypeScript backend
- `npm start` – Run compiled backend
- `npm run lint` – Lint codebase
- `npm run test` – Run tests

## Docker Usage
1. Build and start all services:
   ```sh
   docker-compose up --build
   ```
2. Access frontend at [http://localhost:3000](http://localhost:3000)
3. Backend API at [http://localhost:4000](http://localhost:4000)

## Authentication Flow
- User registers or logs in via frontend
- Backend issues JWT on successful authentication
- JWT is used for protected API requests

## API Endpoints
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Authenticate and receive JWT
- `GET /api/profile` – Get user profile (JWT required)

## Extending the App
- Add database service to `docker-compose.yml` for persistence
- Expand API endpoints and frontend features as needed

## Troubleshooting
- Ensure `.env` is configured
- Check Docker Compose logs for errors: `docker-compose logs`
- For port conflicts, adjust `PORT` in `.env` and `docker-compose.yml`
