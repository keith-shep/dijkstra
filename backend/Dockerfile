# Dev - nodemon and npm i
# Prod - node and npm ci

FROM node:16-alpine3.14

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 3001

