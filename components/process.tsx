import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { Tile } from "./icons";

type Step = { num: string; title: string; body: string; meta: string };
type Stat = { value: string; label: string };

export async function Process() {
  const t = await getTranslations("Process");
  const steps = t.raw("steps") as Step[];
  const stats = t.raw("stats") as Stat[];
  const hl = (chunks: React.ReactNode) => <span className="hl">{chunks}</span>;

  return (
    <section className="section" id="process">
      <header className="section-head reveal">
        <Tile glyph="route" accent="#38d6f0" />
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="h2 grad">{t.rich("title", { hl })}</h2>
        <p className="lede">{t("sub")}</p>
      </header>

      <ol className="steps">
        {steps.map((s, i) => (
          <li
            key={s.num}
            className="step reveal"
            style={{ "--d": `${i * 110}ms` } as CSSProperties}
          >
            <span className="step-node" aria-hidden="true" />
            <span className="num">{s.num}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <p className="meta">{s.meta}</p>
          </li>
        ))}
      </ol>

      <dl className="stats reveal">
        {stats.map((s) => (
          <div key={s.value} className="stat">
            <dt className="l">{s.label}</dt>
            <dd className="v grad">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
