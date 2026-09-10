#!/bin/bash
set -e

NETWORK_NAME="traffic-network"

echo "======================================"
echo " Starting Traffic Frontend"
echo "======================================"

if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
    echo "Creating Docker network: $NETWORK_NAME"
    docker network create "$NETWORK_NAME"
else
    echo "Docker network already exists: $NETWORK_NAME"
fi

echo ""
echo "Building and starting frontend..."
docker compose up -d --build

echo ""
echo "======================================"
echo " Traffic Frontend Started"
echo "======================================"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8080"
echo ""
