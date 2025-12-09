FROM node:18-alpine AS builder
WORKDIR /app
COPY ../../backend/package.json ../../backend/package-lock.json ./
RUN npm install
COPY ../../backend .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY ../../backend/package.json ./
RUN npm install --production
EXPOSE 4000
CMD ["npm", "run", "start"]

