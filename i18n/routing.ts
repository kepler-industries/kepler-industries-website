import { defineRouting } from "next-intl/routing";

// Français d'abord : « / » sert toujours le français, l'anglais vit sous « /en ».
// La détection de langue du navigateur est coupée pour que la clientèle
// française arrive toujours sur la version française.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  localeDetection: false,
  // Sans détection de langue, le cookie NEXT_LOCALE ne sert à rien.
  localeCookie: false,
  // Les hreflang sont dans le <head> (metadata de la page) : pas d'en-tête
  // `Link` en double, qui en déclarait aussi pour les pages 404.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export const BASE_URL = "https://www.kepler-industries.com";

/** URL canonique de l'accueil d'une langue (le français est à la racine). */
export function localeUrl(locale: string): string {
  return locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`;
}
