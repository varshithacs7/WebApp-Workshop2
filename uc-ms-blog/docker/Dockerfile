FROM node:18.16.0-alpine3.17 As development

ARG NODE_ENV

LABEL maintainer="UniCourt Workshop <unicourt.com>" \
    version="1.0.0" \
    description="Docker image for UniCourt Workshop uc-blog Service"

WORKDIR /home/uc_user/blog-service

COPY uc-ms-blog/docker/prisma.sh ./

COPY uc-ms-blog/blog-service/package.json ./

COPY uc-ms-blog/blog-service/.npmrc ./

RUN npm install

COPY uc-ms-blog/blog-service/ ./

RUN sh prisma.sh && npm run build

RUN if [[ "$NODE_ENV" != "dev" ]] ; then npm prune --production ; fi

FROM node:18.16.0-alpine3.17  As production

ENV NODE_ENV=production

WORKDIR /home/uc_user/blog-service

RUN set -x \
    && addgroup -g 1005 -S "uc_user" \
    && adduser -u 1005 -h "/home/uc_user" -s "/bin/sh" -g "uc_user" -S -G "uc_user" "uc_user"

COPY --from=development /home/uc_user/blog-service/dist ./dist

COPY --from=development /home/uc_user/blog-service/prisma ./prisma

COPY --from=development /home/uc_user/blog-service/node_modules ./node_modules

COPY --chown=uc_user:uc_user uc-ms-blog/docker/entrypoint.sh .

RUN chmod +x ./entrypoint.sh

USER uc_user

ENTRYPOINT ["sh","./entrypoint.sh"]