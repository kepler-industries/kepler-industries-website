"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

// Bascule FR / EN : deux liens, la langue active est mise en avant.
// Liens directs vers « / » et « /en » : le Link de next-intl écrivait « /fr »,
// une redirection vers « / ».
export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as Locale;

  return (
    <nav className="lang" aria-label={t("label")}>
      {routing.locales.map((code) => (
        <a
          key={code}
          href={code === routing.defaultLocale ? "/" : `/${code}`}
          hrefLang={code}
          aria-current={code === locale ? "true" : undefined}
        >
          {code.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}
