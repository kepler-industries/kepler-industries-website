# Kepler Industries — Website

Marketing site for Kepler Industries, an independent studio that designs and builds custom mobile apps, websites and software. French first (`/`), English at `/en` — see [I18N.md](I18N.md).

Live at [www.kepler-industries.com](https://www.kepler-industries.com).

## Stack

- Next.js 16 (App Router) · React 19
- TypeScript
- Tailwind CSS v4
- Geist + Geist Mono + Instrument Serif (via `next/font/google`)
- Hero 3D logo: raw WebGL raymarching shader (`components/k-shader.tsx`), no 3D dependency
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

## Security headers

`next.config.ts` sends a Content-Security-Policy, HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, COOP and `Permissions-Policy` on every response. The CSP only allows the site itself and the Kepler Business contact API (`CONTACT_ENDPOINT` in `components/links.ts`): a new third-party script, font, image, iframe or API must be added to it, or the browser blocks it. The reasons for `'unsafe-inline'` are written next to the policy.

The image optimizer (`/_next/image`) is turned off (`images.unoptimized`): the site doesn't use `next/image`.

Test a production build locally with `HOSTNAME=localhost` (not `127.0.0.1`): with a loopback IP, Next.js 16.4 proxies the next-intl rewrite of `/` to itself and the page redirects in a loop. Docker (`0.0.0.0`) is not affected.

## Docker

The project ships with a multi-stage Dockerfile that builds the Next.js app in standalone output mode and runs it on port 3000.

```bash
docker build -t kepler-industries-website .
docker run --rm -p 3000:3000 kepler-industries-website
```
