import { getTranslations } from "next-intl/server";
import { ArrowIcon } from "./brand-mark";

export async function Hero() {
  const t = await getTranslations("Hero");
  const r = await getTranslations("Hero.readout");

  return (
    <section className="hero" data-screen-label={t("screenLabel")}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="container">
        <div className="hero-meta">
          <span>{t("bulletin")}</span>
          <span className="pulse">
            <span className="pulse-dot" />
            {t("openSlots")}
          </span>
        </div>

        <h1 className="hero-title">
          {t("titleLine1")}
          <br />
          {t.rich("titleLine2", { em: (chunks) => <em>{chunks}</em> })}
        </h1>

        <div className="hero-row">
          <p className="hero-lede">{t("lede")}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              {t("viewProjects")}
              <ArrowIcon />
            </a>
            <a href="#contact" className="btn btn-ghost">
              {t("startProject")}
              <ArrowIcon />
            </a>
          </div>
        </div>

        <dl className="hero-readout">
          <div>
            <dt>{r("trajectoryLabel")}</dt>
            <dd>
              {r.rich("trajectoryValue", {
                em: (chunks) => <span className="em">{chunks}</span>,
              })}
            </dd>
          </div>
          <div>
            <dt>{r("disciplinesLabel")}</dt>
            <dd>{r("disciplinesValue")}</dd>
          </div>
          <div>
            <dt>{r("operatingSinceLabel")}</dt>
            <dd>
              {r.rich("operatingSinceValue", {
                em: (chunks) => <span className="em">{chunks}</span>,
              })}
            </dd>
          </div>
          <div>
            <dt>{r("coordinatesLabel")}</dt>
            <dd>{r("coordinatesValue")}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
