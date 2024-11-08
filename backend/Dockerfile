FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 5000

RUN npm run prisma-generate

RUN npm run build

CMD ["npm", "run", "start"]
