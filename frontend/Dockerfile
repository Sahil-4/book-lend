FROM node:20-alpine3.20

WORKDIR /app

COPY package*.json .

RUN npm install

COPY public public
COPY src src
COPY .env .env
COPY tsconfig.json tsconfig.json

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start" ]
