FROM node:18-alpine as base
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
RUN env


WORKDIR /opt/app
COPY . .
RUN if [ "${NODE_ENV}" = "development" ]; then \
  # dev 
  npm install \
  ; else \
  # prod
  npm install --only=production \
  ; fi

RUN if [ "${NODE_ENV}" = "production" ]; then \
  npm install -g typescript \
  ; fi

RUN chown -R node:node /opt/app
USER node

RUN if [ "${NODE_ENV}" = "production" ]; then \
  npm run build \
  ; fi

RUN if [ "${NODE_ENV}" = "production" ]; then \
  rm -rf src \
  ; fi

EXPOSE 8080
CMD if [ "${NODE_ENV}" = "development" ]; then \
  npm run dev \
  ; else \
  npm run start \
  ; fi