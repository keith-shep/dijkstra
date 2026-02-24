# Dev - nodemon and npm i
# Prod - node and npm ci

FROM node:22.18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 3001

