FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache git docker-cli docker-compose
COPY package*.json ./
RUN npm install --production
COPY src ./src
EXPOSE 8787
CMD ["npm", "start"]
