# Dev - nodemon and npm i
# Prod - node and npm ci

FROM node:16-alpine3.14 as build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.20-alpine

# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the docker hub page
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html


