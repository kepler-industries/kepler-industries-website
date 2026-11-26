import { getTranslations } from "next-intl/server";
import { localeUrl, routing } from "@/i18n/routing";
import { ArrowIcon, BrandLink } from "@/components/brand-mark";
import "./globals.css";

// Page 404 de tout le site (« /nope », « /en/nope », « /foo.php »…). Next.js
// renvoie le statut 404 et ajoute lui-même <meta name="robots" content="noindex">.
// Page statique en français avec un lien vers l'accueil anglais : lire la langue
// dans les en-têtes rendrait toutes les pages dynamiques.
export default async function NotFound() {
  const fr = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "NotFound",
  });
  const en = await getTranslations({ locale: "en", namespace: "NotFound" });
  const enHome = new URL(localeUrl("en")).pathname;

  return (
    <html lang="fr">
      <head>
        <title>{`${fr("title")} · Kepler Industries`}</title>
      </head>
      <body>
        <div className="shell">
          <main className="section not-found">
            <BrandLink href="/" />
            <span className="eyebrow">404</span>
            <h1 className="h2 grad">{fr("heading")}</h1>
            <p className="lede">{fr("body")}</p>
            <a href="/" className="btn btn-primary">
              {fr("home")}
              <ArrowIcon />
            </a>
            <p className="lede" lang="en">
              {en("title")} · <a href={enHome}>{en("home")}</a>
            </p>
          </main>
        </div>
      </body>
    </html>
  );
}
