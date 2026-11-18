"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { BrandLink } from "./brand-mark";
import { LanguageSwitcher } from "./language-switcher";

const LINKS = ["projects", "services", "process", "contact"] as const;

export function Nav() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}
    >
      <div className="nav-inner">
        <BrandLink ariaLabel={t("homeAriaLabel")} />

        <nav className="nav-links" aria-label={t("primaryAriaLabel")}>
          {LINKS.map((id) => (
            <a key={id} href={`#${id}`}>
              {t(id)}
            </a>
          ))}
        </nav>

        <div className="nav-tools">
          <LanguageSwitcher />
          <a href="#contact" className="btn btn-primary btn-sm">
            {t("cta")}
          </a>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-controls="nav-panel"
            aria-label={open ? t("menuClose") : t("menuOpen")}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>

      <div className="nav-panel" id="nav-panel" inert={!open}>
        <div className="nav-panel-inner">
          {LINKS.map((id) => (
            <a key={id} href={`#${id}`} onClick={close}>
              {t(id)}
            </a>
          ))}
          <div className="nav-panel-foot">
            <LanguageSwitcher />
            <a href="#contact" className="btn btn-primary btn-sm" onClick={close}>
              {t("cta")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
