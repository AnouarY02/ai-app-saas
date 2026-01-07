#!/usr/bin/env bash
set -euo pipefail

cd /c/AI-Factory/ai-app-saas

echo "==> 0) Ensure .env exists"
if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
  else
    cat > .env <<'EOF'
NODE_ENV=production
VITE_BACKEND_URL=http://backend:4000
EOF
  fi
fi
grep -q '^VITE_BACKEND_URL=' .env || echo 'VITE_BACKEND_URL=http://backend:4000' >> .env

echo "==> 1) Write ROOT docker-compose.yml (canonical, no version)"
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

echo "==> 2) Overwrite backend/Dockerfile (WF4-proof, npm install, no COPY hacks)"
cat > backend/Dockerfile <<'DOCKER'
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build if TS config exists; do not fail hard if project is plain JS
RUN if [ -f "tsconfig.json" ]; then npm run build || true; else echo "no tsconfig.json"; fi

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
RUN apk add --no-cache wget
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
# Copy both compiled + source (safe, no redirects)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
EXPOSE 4000
CMD ["sh", "-c", "node dist/index.js || node dist/server.js || node dist/main.js || node src/index.js || node src/server.js"]
DOCKER

echo "==> 3) Overwrite frontend/Dockerfile (WF4-proof, Vite->nginx, no redirects)"
cat > frontend/Dockerfile <<'DOCKER'
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS runner
# Simple SPA config for React Router
RUN printf "server { listen 80; root /usr/share/nginx/html; location / { try_files \\$uri \\$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
DOCKER

echo
echo "==> 4) Show what WF4 will use"
echo "----- docker-compose.yml -----"
sed -n '1,220p' docker-compose.yml
echo
echo "----- backend/Dockerfile -----"
sed -n '1,260p' backend/Dockerfile
echo
echo "----- frontend/Dockerfile -----"
sed -n '1,260p' frontend/Dockerfile
echo
echo "==> Done. Now rebuild:"
echo "  docker compose down -v"
echo "  docker compose up -d --build"
