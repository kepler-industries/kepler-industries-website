"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { BrandLink } from "./brand-mark";
import { LanguageSwitcher } from "./language-switcher";

export function Nav() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <BrandLink href="#" ariaLabel={t("homeAriaLabel")} />
      <nav className="nav-links" aria-label={t("primaryAriaLabel")}>
        <a href="#about">{t("about")}</a>
        <a href="#vision">{t("vision")}</a>
        <a href="#projects">{t("projects")}</a>
        <a href="#services">{t("services")}</a>
        <a href="#contact">{t("contact")}</a>
      </nav>
      <div className="nav-tools">
        <LanguageSwitcher />
        <a href="#contact" className="nav-cta">
          <span className="dot" />
          {t("cta")}
        </a>
      </div>
    </header>
  );
}
