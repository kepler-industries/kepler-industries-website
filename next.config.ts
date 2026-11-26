import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Langues retirées lors de la refonte (le site est désormais FR + EN) :
// les anciennes URL renvoient vers l'accueil français.
const RETIRED_LOCALES = ["es", "it", "de"];

// Hôte canonique : www. Coolify sert les deux hôtes sans redirection et
// Cloudflare ne fait que http → https : l'apex est redirigé ici, en 301.
const CANONICAL_ORIGIN = "https://www.kepler-industries.com";
const APEX_HOST = "kepler-industries.com";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: APEX_HOST }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        statusCode: 301,
      },
      // Pas de redirection « /fr » → « / » ici : next-intl réécrit « / » en
      // « /fr » en interne et la règle bouclerait. next-intl s'en charge (307).
      ...RETIRED_LOCALES.flatMap((l) => [
        { source: `/${l}`, destination: "/", permanent: true },
        { source: `/${l}/:path*`, destination: "/", permanent: true },
      ]),
    ];
  },
};

export default withNextIntl(nextConfig);
