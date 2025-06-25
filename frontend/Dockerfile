FROM node:24-alpine3.21

WORKDIR /app

COPY package*.json .

RUN npm install

COPY public public
COPY src src
COPY .env .env
COPY next.config.ts next.config.ts
COPY tsconfig.json tsconfig.json

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start" ]
