# syntax=docker/dockerfile:1.6

### BUILD

FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV TZ=UTC
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

### PRODUCTION

FROM node:22-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV TZ=UTC
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
