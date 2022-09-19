FROM node:16.16.0-alpine3.15

LABEL maintainer="UniCourt" \
    git-repo="git@github.com:UniCourt/WebApp-Workshop1.git" \
    email="noelneethanr@unicourt.com"

RUN mkdir -p app
WORKDIR /app

RUN apk update --no-cache && npm update && \
    apk add git && \
    npm i -g @nestjs/cli

EXPOSE 3000 5555