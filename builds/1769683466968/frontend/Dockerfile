FROM node:20-alpine AS builder
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
COPY package*.json ./
RUN npm ci --ignore-scripts || npm install --ignore-scripts
COPY . .
RUN mkdir -p public
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html 2>/dev/null || true
COPY --from=builder /app/out /usr/share/nginx/html 2>/dev/null || true
COPY --from=builder /app/build /usr/share/nginx/html 2>/dev/null || true

# CRITICAL FIX: Proper nginx config without escaped dollars
RUN echo 'server { \
  listen 80; \
  root /usr/share/nginx/html; \
  location / { \
    try_files \$uri \$uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

RUN apk add --no-cache wget
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
