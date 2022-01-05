FROM node:current-bullseye-slim AS deps

WORKDIR /app

COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:current-bullseye-slim AS builder
WORKDIR /app
COPY ./frontend/ .
COPY ./static /static
COPY --from=deps /app/node_modules ./node_modules
COPY ./data /data
ENV DATA_DIR /data
RUN yarn build && yarn export -o /out

FROM nginx:stable AS runner

COPY --from=builder /out /usr/share/nginx/html
COPY ./frontend/docker/nginx.conf /etc/nginx/nginx.conf
