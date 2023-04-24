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

RUN npm run build

RUN if [[ "$NODE_ENV" != "dev" ]] ; then npm prune --production ; fi

FROM node:18.16.0-alpine3.17 As production

ENV NODE_ENV=production

WORKDIR /home/uc_user/controller-blog

RUN set -x \
    && addgroup -g 1005 -S "uc_user" \
    && adduser -u 1005 -h "/home/uc_user" -s "/bin/sh" -g "uc_user" -S -G "uc_user" "uc_user"

COPY --from=development /home/uc_user/controller-blog/dist ./dist

COPY --from=development /home/uc_user/controller-blog/node_modules ./node_modules

USER uc_user

CMD ["node", "dist/main"]