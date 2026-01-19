# WF4 Runner Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install git, docker CLI
RUN apk add --no-cache git docker-cli docker-compose

COPY package*.json ./
RUN npm install --production

COPY src ./src

ENV PORT=8787
EXPOSE 8787

CMD ["npm", "start"]
