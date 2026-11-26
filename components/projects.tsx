import type { CSSProperties } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "./brand-mark";
import { Tile } from "./icons";
import { powrUrl } from "./links";
import { ProjectVisual } from "./project-visuals";

type Item = {
  id: string;
  name: string;
  category: string;
  status: string;
  description: string;
};

type MoreItem = Omit<Item, "category">;

// Données non traduites : lien public, couleur d'accent, stack, mise en page.
const META: Record<
  string,
  {
    accent: string;
    url?: string;
    stack: string[];
    state: "live" | "build" | "proto";
    span?: "wide" | "narrow";
  }
> = {
  powr: {
    accent: "#ff7a29",
    stack: ["React Native", "Expo", "Hono", "Bun", "Prisma"],
    state: "live",
    span: "wide",
  },
  rituel: {
    accent: "#a3e635",
    stack: ["Next.js", "Apple Wallet", "Google Wallet", "Drizzle"],
    state: "build",
    span: "narrow",
  },
  orbit: {
    accent: "#8b5cf6",
    url: "https://orbit.kepler-industries.com",
    stack: ["Tauri 2", "React", "Hono", "Prisma"],
    state: "live",
    span: "narrow",
  },
  littoral: {
    accent: "#22d3ee",
    stack: ["Expo", "Swift", "Bun", "Hono", "Prisma"],
    state: "build",
    span: "wide",
  },
  business: {
    accent: "#5b8cff",
    stack: ["TanStack Start", "Hono", "Prisma", "BullMQ", "MCP"],
    state: "live",
    span: "wide",
  },
  saunactiv: {
    accent: "#f5c46b",
    url: "https://saunactiv-ocean.fr",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    state: "live",
    span: "narrow",
  },
  qlp: { accent: "#f87171", stack: [], state: "build" },
  star: { accent: "#facc15", stack: [], state: "build" },
  empowered: { accent: "#e5e7eb", stack: [], state: "build" },
  flux: { accent: "#34d399", stack: [], state: "proto" },
};

const accentStyle = (accent: string, delay = 0) =>
  ({ "--accent": accent, "--d": `${delay}ms` }) as CSSProperties;

export async function Projects() {
  const t = await getTranslations("Projects");
  const m = await getTranslations("Mocks");
  const items = t.raw("items") as Item[];
  const more = t.raw("more") as MoreItem[];
  const locale = await getLocale();
  // Powr a une version par langue : lien direct, sans la redirection de la racine.
  const urlFor = (id: string) => (id === "powr" ? powrUrl(locale) : META[id].url);
  const hl = (chunks: React.ReactNode) => <span className="hl">{chunks}</span>;

  return (
    <section className="section" id="projects">
      <header className="section-head reveal">
        <Tile glyph="grid" accent="#8b7cf6" />
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="h2 grad">{t.rich("title", { hl })}</h2>
        <p className="lede">{t("sub")}</p>
      </header>

      <div className="bento">
        {items.map((p, i) => {
          const meta = META[p.id];
          return (
            <article
              key={p.id}
              className={`card pcard ${meta.span ?? ""} reveal`}
              style={accentStyle(meta.accent, (i % 2) * 90)}
            >
              <div className="pcard-visual" aria-hidden="true">
                <ProjectVisual id={p.id} t={(k) => m(k)} />
              </div>
              <div className="pcard-body">
                <div className="pcard-head">
                  <Tile glyph={p.id} accent={meta.accent} size="md" />
                  <div>
                    <h3>{p.name}</h3>
                    <p className="cat">{p.category}</p>
                  </div>
                  <span className={`status ${meta.state}`}>{p.status}</span>
                </div>
                <p className="pcard-desc">{p.description}</p>
                <div className="pcard-foot">
                  <ul className="tags" aria-label="Stack">
                    {meta.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  {urlFor(p.id) ? (
                    <a
                      className="pcard-link"
                      href={urlFor(p.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t("visit")} — ${p.name}`}
                    >
                      {t("visit")}
                      <ArrowUpRight />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="more">
        <h3 className="more-title reveal">{t("moreTitle")}</h3>
        <div className="more-grid">
          {more.map((p, i) => {
            const meta = META[p.id];
            return (
              <div
                key={p.id}
                className="more-item reveal"
                style={accentStyle(meta.accent, (i % 2) * 90)}
              >
                <Tile glyph={p.id} accent={meta.accent} size="sm" />
                <div>
                  <h4>
                    {p.name}
                    <span className={`status ${meta.state}`}>{p.status}</span>
                  </h4>
                  <p>{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
