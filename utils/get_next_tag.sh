#!/usr/bin/env bash

set -e
set -o pipefail

DOCKER_CONFIG_JSON=${DOCKER_CONFIG:-~/.docker}/config.json

default_tag=$(date +%Y%m%d)

mycurl() {
  curl --silent --fail "$@"
}

info() {
  echo "$@" >&2
}

if [ ! -f "$DOCKER_CONFIG_JSON" ]; then
  info "Missing $DOCKER_CONFIG_JSON. Defaulting to current date"
  echo "$default_tag"
  exit 0
fi

info "Using configuration from $DOCKER_CONFIG_JSON" >&2
AUTH=$(jq -r '.auths["ghcr.io"].auth' < "$DOCKER_CONFIG_JSON" | base64 -d)

if [ -z "$AUTH" ]; then
  info "Not logged in ghcr.io"
  echo "$default_tag"
  exit 0
fi

# obtain a ghcr.io token
TOKEN_JSON=$(mycurl -u "$AUTH" "https://ghcr.io/token?service=ghcr.io&scope=repository::pull&client_id=something")
info "ghcr.io token obtained"

TOKEN=$(echo "$TOKEN_JSON"| jq -r .token)

images=("algorithm-ninja/oii-stats-frontend" "algorithm-ninja/oii-stats-backend")
tags=""

for image in "${images[@]}"; do
  new_tags=$(mycurl -H "Authorization: Bearer $TOKEN" https://ghcr.io/v2/$image/tags/list | jq -r '.tags[]' | grep "$default_tag")
  tags=$(printf '%s\n%s' "$new_tags" "$tags")
done

if ! echo "$tags" | grep "$default_tag" >/dev/null; then
  info "Default tag $default_tag is available, using it"
  echo "$default_tag"
  exit 0
else
  info "Default tag $default_tag is not available"
fi

for v in $(seq 1 20); do
  tag="$default_tag-v$v"
  if ! echo "$tags" | grep "$tag" >/dev/null; then
    info "Tag $tag is available, using it"
    echo "$tag"
    exit 0
  else
    info "Tag $tag is not available"
  fi
done

info "No tag found, this may be an error!"
exit 1
