import { getTranslations } from "next-intl/server";

export async function About() {
  const t = await getTranslations("About");
  const s = await getTranslations("About.stats");

  const em = (chunks: React.ReactNode) => <em>{chunks}</em>;

  return (
    <section className="about" id="about" data-screen-label={t("screenLabel")}>
      <div className="container">
        <div className="section-head">
          <h2>
            {t("titleLine1")} {t.rich("titleLine2", { em })}
          </h2>
          <div className="meta">
            <span className="num">{t("metaNum")}</span>
            <p className="desc">{t("metaDesc")}</p>
          </div>
        </div>

        <div className="about-grid">
          <p className="about-lead reveal">{t.rich("lead", { em })}</p>
          <div className="about-body reveal">
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
          </div>
        </div>

        <div className="about-stats">
          <div className="about-stat">
            <div className="num">
              <em>04</em>
            </div>
            <div className="lbl">{s("yearsLabel")}</div>
          </div>
          <div className="about-stat">
            <div className="num">42</div>
            <div className="lbl">{s("productsLabel")}</div>
          </div>
          <div className="about-stat">
            <div className="num">
              <em>11</em>
            </div>
            <div className="lbl">{s("foundersLabel")}</div>
          </div>
          <div className="about-stat">
            <div className="num">∞</div>
            <div className="lbl">{s("iterationsLabel")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
