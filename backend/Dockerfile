# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /workspace

FROM base AS deps
RUN apt-get update && \
  apt-get install -y --no-install-recommends python3 make g++ ca-certificates && \
  rm -rf /var/lib/apt/lists/*
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json
COPY e2e/package.json ./e2e/package.json
RUN pnpm install --frozen-lockfile --filter @rocketseat-financy/backend...

FROM deps AS build
ENV DATABASE_URL="file:/tmp/build.db"
COPY . .
RUN pnpm --filter @rocketseat-financy/backend prisma:generate
RUN pnpm --filter @rocketseat-financy/backend build
RUN pnpm --filter @rocketseat-financy/backend deploy --prod --legacy /app
RUN mkdir -p /data

FROM build AS migrate
WORKDIR /workspace/backend
CMD ["pnpm", "exec", "prisma", "db", "push"]

FROM gcr.io/distroless/nodejs22-debian12:nonroot AS runtime
ENV NODE_ENV="production"
WORKDIR /app
COPY --from=build --chown=nonroot:nonroot /app ./
COPY --from=build --chown=nonroot:nonroot /workspace/backend/dist ./dist
COPY --from=build --chown=nonroot:nonroot /workspace/backend/generated ./generated
COPY --from=build --chown=nonroot:nonroot /workspace/backend/prisma ./prisma
COPY --from=build --chown=nonroot:nonroot /data /data
USER nonroot
EXPOSE 4000
VOLUME ["/data"]
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["/nodejs/bin/node", "-e", "fetch('http://127.0.0.1:4000/graphql',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:'query { healthcheck }'})}).then(r=>r.ok?process.exit(0):process.exit(1)).catch(()=>process.exit(1))"]
CMD ["dist/src/index.js"]
