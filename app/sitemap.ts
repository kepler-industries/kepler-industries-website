import type { MetadataRoute } from "next";
import { localeUrl, routing } from "@/i18n/routing";

// Pas de `lastModified` : la date du build n'est pas une date de modification
// du contenu (Google ignore aussi `priority` et `changeFrequency`).
export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, localeUrl(l)]),
  );
  languages["x-default"] = localeUrl(routing.defaultLocale);

  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    alternates: { languages },
  }));
}
