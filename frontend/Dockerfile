FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm install
RUN npm run build

FROM nginx:1.25-alpine as production
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
COPY --from=builder /app/public ./public
COPY --from=builder /app/build ./build
COPY --from=builder /app/build/index.html ./index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
