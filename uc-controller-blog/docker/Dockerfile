FROM node:18.16.0-alpine3.17 As development

ARG NODE_ENV

LABEL maintainer="UniCourt Workshop <unicourt.com>" \
    version="1.0.0" \
    description="Docker image for UniCourt Workshop uc-controller-blog"

WORKDIR /home/uc_user/controller-blog

COPY uc-controller-blog/controller-blog/package.json .

COPY uc-controller-blog/controller-blog/.npmrc .

RUN npm install

COPY uc-controller-blog/controller-blog .

RUN if [[ "$NODE_ENV" != "dev" ]] ; then npm prune --production ; fi