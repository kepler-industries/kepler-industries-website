import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.kepler-industries.com";

function urlFor(locale: string): string {
  return locale === routing.defaultLocale
    ? BASE_URL
    : `${BASE_URL}/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, urlFor(l)]),
  );
  languages["x-default"] = urlFor(routing.defaultLocale);

  return routing.locales.map((locale) => ({
    url: urlFor(locale),
    lastModified,
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
