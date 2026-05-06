import { getTranslations } from "next-intl/server";

type Service = {
  num: string;
  prefix: string;
  emphasis: string;
  body: string;
  tags: string[];
};

export async function Services() {
  const t = await getTranslations("Services");
  const items = t.raw("items") as Service[];

  const em = (chunks: React.ReactNode) => <em>{chunks}</em>;

  return (
    <section
      className="services"
      id="services"
      data-screen-label={t("screenLabel")}
    >
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

        <div className="services-grid">
          {items.map((s) => (
            <div className="service" key={s.num}>
              <div className="s-num">{s.num}</div>
              <h3 className="s-title">
                {s.prefix} <em>{s.emphasis}</em>
              </h3>
              <p className="s-body">{s.body}</p>
              <div className="s-tags">
                {s.tags.map((tag) => (
                  <span className="s-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
