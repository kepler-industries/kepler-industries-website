import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Langues retirées lors de la refonte (le site est désormais FR + EN) :
// les anciennes URL renvoient vers l'accueil français.
const RETIRED_LOCALES = ["es", "it", "de"];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  async redirects() {
    return RETIRED_LOCALES.flatMap((l) => [
      { source: `/${l}`, destination: "/", permanent: true },
      { source: `/${l}/:path*`, destination: "/", permanent: true },
    ]);
  },
};

export default withNextIntl(nextConfig);
