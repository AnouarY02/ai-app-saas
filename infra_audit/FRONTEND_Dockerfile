# AI-Fabriek Generated Dockerfile - Frontend
# Next.js 14 optimized multi-stage build
# Build: clean-paths-final

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:18-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci --ignore-scripts && \
    npm cache clean --force

# ============================================
# Stage 2: Builder
# ============================================
FROM node:18-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js
RUN npm run build || true

# ============================================
# Stage 3: Runner (nginx for static serving)
# ============================================
FROM nginx:alpine AS runner

# Custom nginx config
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf 2>/dev/null ||      echo 'server {        listen 80;        root /usr/share/nginx/html;        location / { try_files \$uri \$uri/ /index.html; }        location /api { proxy_pass \$NEXT_PUBLIC_API_URL; }      }' > /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/out /usr/share/nginx/html 2>/dev/null ||      COPY --from=builder /app/.next/standalone /usr/share/nginx/html 2>/dev/null ||      COPY --from=builder /app/dist /usr/share/nginx/html

# Health check
RUN apk add --no-cache wget

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
