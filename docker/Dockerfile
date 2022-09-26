FROM node:16.16.0-alpine3.15

LABEL maintainer="UniCourt" \
    git-repo="git@github.com:UniCourt/WebApp-Workshop2.git" \
    email="noelneethanr@unicourt.com"

RUN mkdir -p app
WORKDIR /app

# Update apk package & npm
RUN apk update --no-cache && npm update && \
    npm i -g @nestjs/cli

COPY ./app/package.json .
RUN npm install
COPY ./app .

EXPOSE 3000