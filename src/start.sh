#!/bin/bash

set -e

NETWORK_NAME="traffic-network"

if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
    echo "Creating Docker network: $NETWORK_NAME"
    docker network create "$NETWORK_NAME"
fi

echo "Starting traffic backend..."
docker compose up -d --build

echo ""
echo "Backend started."
echo "API: http://localhost:8080"