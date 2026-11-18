import { defineRouting } from "next-intl/routing";

// Français d'abord : « / » sert toujours le français, l'anglais vit sous « /en ».
// La détection de langue du navigateur est coupée pour que la clientèle
// française arrive toujours sur la version française.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};
