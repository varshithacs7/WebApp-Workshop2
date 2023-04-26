FROM node:18.16.0-alpine3.17 As development

ARG NODE_ENV

LABEL maintainer="UniCourt Workshop <unicourt.com>" \
    version="1.0.0" \
    description="Docker image for UniCourt Workshop uc-blog Service"

WORKDIR /home/uc_user/blog-service

COPY uc-ms-blog/blog-service/package.json ./

COPY uc-ms-blog/blog-service/.npmrc ./

RUN npm install

COPY uc-ms-blog/blog-service/ ./

RUN if [[ "$NODE_ENV" != "dev" ]] ; then npm prune --production ; fi