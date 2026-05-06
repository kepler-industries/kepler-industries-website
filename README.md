# Kepler Industries — Website

Marketing site for Kepler Industries, an independent creative studio designing and building ambitious digital products.

Live at [www.kepler-industries.com](https://www.kepler-industries.com).

## Stack

- Next.js 16 (App Router) · React 19
- TypeScript
- Tailwind CSS v4
- Geist + Geist Mono + Instrument Serif (via `next/font/google`)
- Deployed on Coolify from a Dockerfile

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
pnpm start
```

## Docker

The project ships with a multi-stage Dockerfile that builds the Next.js app in standalone output mode and runs it on port 3000.

```bash
docker build -t kepler-industries-website .
docker run --rm -p 3000:3000 kepler-industries-website
```
