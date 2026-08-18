#!/bin/bash
set -euo pipefail

if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
fi

pnpm --filter @rocketseat-financy/backend prisma:generate
