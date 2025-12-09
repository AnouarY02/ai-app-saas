FROM node:18-alpine AS builder
WORKDIR /app
COPY ../../frontend/package.json ../../frontend/package-lock.json ./
RUN npm install
COPY ../../frontend .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/build ./build
COPY ../../frontend/package.json ./
RUN npm install --production
EXPOSE 3000
CMD ["npm", "run", "start"]

