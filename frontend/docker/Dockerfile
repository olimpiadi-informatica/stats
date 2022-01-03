FROM node:alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY ./frontend/ .
COPY --from=deps /app/node_modules ./node_modules
COPY ./data /data
ENV DATA_DIR /data
RUN yarn build && yarn export -o /out

# Production image, copy all the files and run next
FROM nginx:stable AS runner

COPY --from=builder /out /usr/share/nginx/html
