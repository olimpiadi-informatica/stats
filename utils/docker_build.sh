#!/usr/bin/env bash

if [ ! -f backend/docker/Dockerfile ]; then
  echo "Error: run this script from the repo root"
  exit 1
fi

# compute the image tag
TAG=$(date +%Y%m%d)
echo "Image tag is: $TAG"

docker build \
  -t "ghcr.io/algorithm-ninja/oii-stats-backend:$TAG" \
  -f backend/docker/Dockerfile \
  backend
