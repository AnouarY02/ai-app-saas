#!/usr/bin/env bash
set -euo pipefail

cd /c/AI-Factory/ai-app-saas

echo "==> 1) Ensure infra/ exists"
mkdir -p infra

echo "==> 2) Write ROOT docker-compose.yml (canonical)"
cat > docker-compose.yml <<'YML'
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    env_file:
      - .env
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - PORT=4000
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:4000/health"]
      interval: 10s
      timeout: 5s
      retries: 10

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    env_file:
      - .env
    ports:
      - "3000:80"
    depends_on:
      backend:
        condition: service_healthy
YML

echo "==> 3) Write INFRA docker-compose.yml (thin wrapper, same behavior)"
cat > infra/docker-compose.yml <<'YML'
services:
  backend:
    build:
      context: ../backend
      dockerfile: Dockerfile
    env_file:
      - ../.env
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - PORT=4000
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:4000/health"]
      interval: 10s
      timeout: 5s
      retries: 10

  frontend:
    build:
      context: ../frontend
      dockerfile: Dockerfile
    env_file:
      - ../.env
    ports:
      - "3000:80"
    depends_on:
      backend:
        condition: service_healthy
YML

echo "==> 4) Write INFRA Dockerfile.backend (safe, npm install, no COPY hacks)"
cat > infra/Dockerfile.backend <<'DOCKER'
FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# If TS build exists, run it; otherwise ignore
RUN if [ -f "tsconfig.json" ]; then npm run build || true; else echo "no tsconfig.json"; fi

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

RUN apk add --no-cache wget

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

EXPOSE 4000

# Prefer compiled, fall back to src
CMD ["sh", "-c", "node dist/index.js || node dist/server.js || node src/index.js"]
DOCKER

echo "==> 5) Write INFRA Dockerfile.frontend (nginx static; safe copies only)"
cat > infra/Dockerfile.frontend <<'DOCKER'
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Build (Vite or Next export). If build fails, fail (better signal).
RUN npm run build

FROM nginx:alpine AS runner

# Single, simple SPA config
RUN printf "server { listen 80; root /usr/share/nginx/html; location / { try_files \\$uri \\$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

# Prefer common build outputs (we avoid shell hacks: we COPY one expected output)
# Default: Vite -> /app/dist
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
DOCKER

echo "==> 6) Show resulting files"
echo "----- docker-compose.yml -----"
sed -n '1,220p' docker-compose.yml
echo
echo "----- infra/docker-compose.yml -----"
sed -n '1,220p' infra/docker-compose.yml
echo
echo "----- infra/Dockerfile.backend -----"
sed -n '1,220p' infra/Dockerfile.backend
echo
echo "----- infra/Dockerfile.frontend -----"
sed -n '1,220p' infra/Dockerfile.frontend
echo

echo "==> Done. Now commit & push:"
echo "    git add docker-compose.yml infra/docker-compose.yml infra/Dockerfile.backend infra/Dockerfile.frontend"
echo "    git commit -m \"fix: make infra WF4-proof (no yarn, no COPY hacks, ports 4000/3000)\""
echo "    git push origin main"
