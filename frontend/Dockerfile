FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY vite.config.ts index.html ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:alpine
RUN printf "server { listen 80; root /usr/share/nginx/html; location / { try_files \\$uri \\$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
