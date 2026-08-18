# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /workspace

FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
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

FROM build AS migrate
WORKDIR /workspace/backend
CMD ["pnpm", "exec", "prisma", "db", "push"]

FROM node:22-alpine AS runtime
ENV NODE_ENV="production"
WORKDIR /app
RUN apk add --no-cache tini && \
  addgroup -S app -g 1001 && \
  adduser -S app -u 1001 -G app && \
  mkdir -p /data && \
  chown -R app:app /app /data
COPY --from=build --chown=app:app /app ./
COPY --from=build --chown=app:app /workspace/backend/dist ./dist
COPY --from=build --chown=app:app /workspace/backend/generated ./generated
COPY --from=build --chown=app:app /workspace/backend/prisma ./prisma
USER app
EXPOSE 4000
VOLUME ["/data"]
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:4000/graphql',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:'query { healthcheck }'})}).then(r=>r.ok?process.exit(0):process.exit(1)).catch(()=>process.exit(1))"
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/src/index.js"]
