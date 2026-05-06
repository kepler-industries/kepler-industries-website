import { getTranslations } from "next-intl/server";
import { BrandLink } from "./brand-mark";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const studio = await getTranslations("Footer.studio");
  const connect = await getTranslations("Footer.connect");
  const signal = await getTranslations("Footer.signal");

  return (
    <footer>
      <div className="foot">
        <div className="foot-brand">
          <BrandLink href="#" />
          <p>{t("tagline")}</p>
        </div>
        <div>
          <h4>{studio("title")}</h4>
          <ul>
            <li>
              <a href="#about">{studio("about")}</a>
            </li>
            <li>
              <a href="#vision">{studio("vision")}</a>
            </li>
            <li>
              <a href="#projects">{studio("projects")}</a>
            </li>
            <li>
              <a href="#services">{studio("services")}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>{connect("title")}</h4>
          <ul>
            <li>
              <a href="mailto:hello@kepler-industries.com">
                {connect("email")}
              </a>
            </li>
            <li>
              <a href="#">{connect("arena")}</a>
            </li>
            <li>
              <a href="#">{connect("readcv")}</a>
            </li>
            <li>
              <a href="#">{connect("twitter")}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>{signal("title")}</h4>
          <ul>
            <li>
              <a href="#">{signal("newsletter")}</a>
            </li>
            <li>
              <a href="#">{signal("fieldNotes")}</a>
            </li>
            <li>
              <a href="#">{signal("pressKit")}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>{t("copyright")}</span>
        <span className="coords">{t("coords")}</span>
        <span>{t("version")}</span>
      </div>
    </footer>
  );
}
