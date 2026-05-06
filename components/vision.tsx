import { getTranslations } from "next-intl/server";

type Principle = { num: string; title: string; body: string };

export async function Vision() {
  const t = await getTranslations("Vision");
  const tags = await getTranslations("Vision.tags");
  const principles = t.raw("principles") as Principle[];

  const em = (chunks: React.ReactNode) => <em>{chunks}</em>;

  return (
    <section className="vision" id="vision" data-screen-label={t("screenLabel")}>
      <div className="container">
        <div className="eyebrow">
          <span className="tick" />
          {t("eyebrow")}
        </div>
        <h2 className="vision-head">
          {t("titleLine1")}
          <br />
          {t.rich("titleLine2", { em })}
        </h2>

        <div className="vision-stage" aria-hidden="true">
          <div className="vision-orbits">
            <div className="orbit o1" />
            <div className="orbit o2" />
            <div className="orbit o3" />
            <div
              className="satellite"
              style={{ left: "50%", top: "calc(50% - 310px)" }}
            />
            <div
              className="satellite"
              style={{
                left: "calc(50% + 380px)",
                top: "50%",
                width: 6,
                height: 6,
              }}
            />
            <div
              className="satellite"
              style={{
                left: "calc(50% - 460px)",
                top: "calc(50% + 100px)",
                width: 5,
                height: 5,
              }}
            />
          </div>
          <div className="planet" />
          <div className="vision-tags">
            <div className="vtag" style={{ left: "12%", top: "24%" }}>
              {tags("trajectory")}
            </div>
            <div className="vtag right" style={{ right: "14%", top: "32%" }}>
              {tags("heat")}
            </div>
            <div className="vtag" style={{ left: "8%", bottom: "22%" }}>
              {tags("coords")}
            </div>
            <div
              className="vtag right"
              style={{ right: "10%", bottom: "28%" }}
            >
              {tags("status")}
            </div>
          </div>
        </div>

        <div className="vision-pillars">
          {principles.map((p, i) => (
            <div className="vision-pillar" key={i}>
              <div className="vp-num">{p.num}</div>
              <h3
                className="vp-title"
                dangerouslySetInnerHTML={{ __html: p.title }}
              />
              <p className="vp-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
