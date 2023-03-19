# Version 4
FROM node:19-alpine3.16 AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM node:19-alpine3.16 AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
CMD [ "yarn", "start" ]