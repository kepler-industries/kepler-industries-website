"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// Bascule FR / EN : deux liens, la langue active est mise en avant.
export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as Locale;

  return (
    <nav className="lang" aria-label={t("label")}>
      {routing.locales.map((code) => (
        <Link
          key={code}
          href="/"
          locale={code}
          hrefLang={code}
          aria-current={code === locale ? "true" : undefined}
        >
          {code.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
