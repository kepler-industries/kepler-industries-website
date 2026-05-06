import { getTranslations } from "next-intl/server";

type Project = {
  num: string;
  prefix: string;
  emphasis: string;
  type: string;
  year: string;
};

export async function Projects() {
  const t = await getTranslations("Projects");
  const items = t.raw("items") as Project[];

  const em = (chunks: React.ReactNode) => <em>{chunks}</em>;

  return (
    <section
      className="projects"
      id="projects"
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

        <div className="project-list">
          {items.map((p) => (
            <a
              key={p.num}
              className="project"
              href="#"
              aria-label={`${p.prefix} ${p.emphasis}`}
            >
              <span className="pnum">{p.num}</span>
              <span className="pname">
                {p.prefix} <em>{p.emphasis}</em>
              </span>
              <span className="ptype">{p.type}</span>
              <span className="pyear">{p.year}</span>
              <span className="parrow">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 12L12 2M12 2H4M12 2v8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="project-thumb" aria-hidden="true">
                <span className="thumb-art" />
                <span className="thumb-stripe" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
