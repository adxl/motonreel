FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
RUN chown -R node:node node_modules

USER node

EXPOSE 9000

CMD npm run start
