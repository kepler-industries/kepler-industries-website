import { getLocale, getTranslations } from "next-intl/server";
import { BrandLink } from "./brand-mark";
import { Email } from "./email";
import { LanguageSwitcher } from "./language-switcher";
import { CLIENT_SPACE_URL, powrUrl } from "./links";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const studio = await getTranslations("Footer.studio");
  const products = await getTranslations("Footer.products");
  const connect = await getTranslations("Footer.connect");
  const locale = await getLocale();

  return (
    <footer className="section footer">
      <div className="foot-grid">
        <div className="foot-brand">
          <BrandLink />
          <p>{t("tagline")}</p>
        </div>
        <div className="foot-col">
          <h2>{studio("title")}</h2>
          <ul>
            <li>
              <a href="#projects">{studio("projects")}</a>
            </li>
            <li>
              <a href="#services">{studio("services")}</a>
            </li>
            <li>
              <a href="#process">{studio("process")}</a>
            </li>
            <li>
              <a href="#contact">{studio("contact")}</a>
            </li>
          </ul>
        </div>
        <div className="foot-col">
          <h2>{products("title")}</h2>
          <ul>
            <li>
              <a href={powrUrl(locale)} target="_blank" rel="noopener noreferrer">
                Powr
              </a>
            </li>
            <li>
              <a
                href="https://orbit.kepler-industries.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kepler Orbit
              </a>
            </li>
          </ul>
        </div>
        <div className="foot-col">
          <h2>{connect("title")}</h2>
          <ul>
            <li>
              <Email />
            </li>
            <li>
              <a
                href={CLIENT_SPACE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {connect("clientSpace")}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/kepler-industries"
                target="_blank"
                rel="noopener noreferrer"
              >
                {connect("github")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="foot-bottom">
        <span>
          {t("copyright", { year: new Date().getFullYear() })} · {t("madeIn")}
        </span>
        <LanguageSwitcher />
      </div>

      <div className="wordmark" aria-hidden="true">
        <span>Kepler</span>
      </div>
    </footer>
  );
}
