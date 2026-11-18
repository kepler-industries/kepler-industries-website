import { getTranslations } from "next-intl/server";

// Technologies réellement utilisées dans les projets du studio.
const TECH = [
  "Next.js",
  "React Native",
  "Expo",
  "Swift",
  "TypeScript",
  "Tauri",
  "Hono",
  "PostgreSQL",
  "Prisma",
  "Kotlin",
  "TanStack",
  "Docker",
];

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {TECH.map((name) => (
        <li key={name} className="tech" style={{ listStyle: "none" }}>
          {name}
        </li>
      ))}
    </ul>
  );
}

export async function Stack() {
  const t = await getTranslations("Stack");
  return (
    <section className="section stack" aria-label={t("label")}>
      <p className="stack-label reveal">{t("label")}</p>
      <div className="marquee reveal" style={{ "--d": "120ms" } as React.CSSProperties}>
        <div className="marquee-track">
          <Group />
          <Group hidden />
        </div>
      </div>
    </section>
  );
}
