FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts
COPY . .
RUN npm run build || echo "No build step"

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 appuser
COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:nodejs /app/dist ./dist
COPY --from=builder --chown=appuser:nodejs /app/src ./src
COPY --from=builder --chown=appuser:nodejs /app/*.js ./
COPY --from=builder --chown=appuser:nodejs /app/*.json ./
RUN apk add --no-cache wget
USER appuser
EXPOSE 4000
HEALTHCHECK --interval=10s --timeout=5s --retries=3 CMD wget --spider -q http://localhost:4000/api/health || exit 1
CMD if [ -f "dist/index.js" ]; then node dist/index.js; elif [ -f "src/index.js" ]; then node src/index.js; else node index.js; fi
