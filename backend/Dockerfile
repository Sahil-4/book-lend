FROM node:20-alpine3.20

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY src src
COPY .env .env
COPY tsconfig.json tsconfig.json

EXPOSE 5000

RUN npm run prisma-generate

RUN npm run build

ENTRYPOINT [ "node", "dist/index.js" ]
