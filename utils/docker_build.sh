#!/usr/bin/env bash

set -e

usage() {
  echo "Usage: $0 [-p]"
  echo "  -p      Push the built images"
  echo "  -t tag  Override the tag"
}

if [ ! -f frontend/docker/Dockerfile ]; then
  usage
  echo "Error: run this script from the repo root"
  exit 1
fi

PUSH=0
TAG=$(date +%Y%m%d)

while getopts "pht:" opt; do
  case "$opt" in
    p)
      PUSH=1
      ;;
    h)
      usage
      exit 0
      ;;
    t)
      TAG="$OPTARG"
      ;;
    *)
      usage
      exit 1
  esac
done

# compute the image tag
echo "Image tag is: $TAG"

docker build \
  -t "ghcr.io/algorithm-ninja/oii-stats-frontend:$TAG" \
  -f frontend/docker/Dockerfile \
  .

if [ "$PUSH" = 1 ]; then
  docker push "ghcr.io/algorithm-ninja/oii-stats-frontend:$TAG"
fi
