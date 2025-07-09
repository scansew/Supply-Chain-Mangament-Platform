#!/bin/sh
# Entrypoint for backend container: always generate Prisma client before starting server
set -e

echo "[Entrypoint] Running: npx prisma generate"
npx prisma generate
echo "[Entrypoint] Prisma client generated successfully. Starting server..."
exec "$@"
