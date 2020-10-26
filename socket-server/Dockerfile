FROM node:lts-alpine

WORKDIR /application

COPY ./node_modules ./node_modules
COPY ./dist ./

ENTRYPOINT ["node", "main"]
