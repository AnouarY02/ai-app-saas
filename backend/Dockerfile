# AI-Fabriek Generated Dockerfile - Backend
# Multi-stage build voor optimale image size
# Build: final-fix-test

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:18-alpine AS deps
WORKDIR /app

# Security: run as non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Install dependencies only
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# ============================================
# Stage 2: Builder
# ============================================
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .

# Build TypeScript (if tsconfig exists)
RUN if [ -f "tsconfig.json" ]; then npm run build || true; fi

# ============================================
# Stage 3: Runner
# ============================================
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Security: non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

# Copy dependencies
COPY --from=deps --chown=appuser:nodejs /app/node_modules ./node_modules

# Copy built app
COPY --from=builder --chown=appuser:nodejs /app/dist ./dist 2>/dev/null || true
COPY --from=builder --chown=appuser:nodejs /app/src ./src 2>/dev/null || true
COPY --from=builder --chown=appuser:nodejs /app/*.js ./
COPY --from=builder --chown=appuser:nodejs /app/*.json ./

# Health check dependencies
RUN apk add --no-cache wget

USER appuser

EXPOSE 3000

# Start command (auto-detect entry point)
CMD if [ -f "dist/index.js" ]; then node dist/index.js; \
    elif [ -f "dist/server.js" ]; then node dist/server.js; \
    elif [ -f "dist/main.js" ]; then node dist/main.js; \
    elif [ -f "src/index.js" ]; then node src/index.js; \
    elif [ -f "index.js" ]; then node index.js; \
    else node server.js; fi
