import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { Tile } from "./icons";

type Service = { id: string; title: string; body: string; points: string[] };

const ACCENTS: Record<string, string> = {
  mobile: "#8b7cf6",
  web: "#5b8cff",
  software: "#38d6f0",
  care: "#4ade80",
};

export async function Services() {
  const t = await getTranslations("Services");
  const items = t.raw("items") as Service[];
  const hl = (chunks: React.ReactNode) => <span className="hl">{chunks}</span>;

  return (
    <section className="section" id="services">
      <header className="section-head reveal">
        <Tile glyph="layers" accent="#5b8cff" />
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="h2 grad">{t.rich("title", { hl })}</h2>
        <p className="lede">{t("sub")}</p>
      </header>

      <div className="services-grid">
        {items.map((s, i) => (
          <article
            key={s.id}
            className="card service reveal"
            style={{ "--d": `${i * 80}ms` } as CSSProperties}
          >
            <Tile glyph={s.id} accent={ACCENTS[s.id]} size="md" />
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <ul className="tags">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
