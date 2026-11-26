import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { CONTACT_ENDPOINT } from "./components/links";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Langues retirées lors de la refonte (le site est désormais FR + EN) :
// les anciennes URL renvoient vers l'accueil français.
const RETIRED_LOCALES = ["es", "it", "de"];

// Hôte canonique : www. Coolify sert les deux hôtes sans redirection et
// Cloudflare ne fait que http → https : l'apex est redirigé ici, en 301.
const CANONICAL_ORIGIN = "https://www.kepler-industries.com";
const APEX_HOST = "kepler-industries.com";

const isDev = process.env.NODE_ENV === "development";

// Seule origine extérieure : l'API de Kepler Business, qui reçoit le
// formulaire de contact (fetch, et envoi classique si le JS n'a pas chargé).
const CONTACT_ORIGIN = new URL(CONTACT_ENDPOINT).origin;

// Content-Security-Policy, la même pour toutes les réponses.
// - script-src 'unsafe-inline' : les pages sont prérendues au build (SSG) et
//   Next y écrit des scripts en ligne (données RSC `self.__next_f.push`, plus
//   le script qui ajoute la classe `js`). Un nonce impose un rendu à chaque
//   requête (plus de SSG, `Cache-Control: no-store`) ; des empreintes
//   (hashes) changent à chaque build et ne sont connues qu'après le rendu.
//   Le site n'affiche aucune donnée venue d'un visiteur (pas de paramètre
//   d'URL repris, pas de contenu utilisateur), donc pas de point d'injection ;
//   la CSP bloque quand même tout script, cadre, plugin ou envoi de données
//   vers une autre origine que le site et l'API de contact.
// - style-src 'unsafe-inline' : attributs `style` de React (délais
//   d'animation, couleurs des projets).
// - img-src data: : icônes SVG en data: dans globals.css.
// - connect-src 'self' : nécessaire aussi à Lighthouse (lecture de robots.txt).
// - En développement : 'unsafe-eval' (React) et WebSocket du rechargement à chaud.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' ${CONTACT_ORIGIN}${isDev ? " ws: wss:" : ""}`,
  `form-action 'self' ${CONTACT_ORIGIN}`,
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Sans includeSubDomains ni preload : ce serait à poser sur l'apex, pour
  // tous les sous-domaines de kepler-industries.com (d'autres projets), donc
  // à décider au niveau de la zone Cloudflare.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Doublon de frame-ancestors pour les anciens navigateurs.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // Le site n'utilise pas next/image : l'optimiseur d'images (/_next/image),
  // source de plusieurs failles de Next.js (RCE, SSRF, DoS), est coupé (404).
  images: { unoptimized: true },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
