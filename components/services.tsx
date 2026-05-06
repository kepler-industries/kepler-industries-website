type Service = {
  num: string;
  prefix: string;
  emphasis: string;
  body: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    num: "— 01",
    prefix: "Web",
    emphasis: "Design",
    body: "Marketing sites, product pages, and interactive experiences engineered for clarity and impact. Strategy, art direction, and implementation in one continuous loop.",
    tags: ["Art Direction", "Webflow", "Next.js", "Motion"],
  },
  {
    num: "— 02",
    prefix: "App",
    emphasis: "Development",
    body: "Native and cross-platform apps built with the discipline of an in-house team. From first prototype to production-grade software, designed to feel native to the device.",
    tags: ["iOS", "SwiftUI", "React Native", "Backend"],
  },
  {
    num: "— 03",
    prefix: "Product",
    emphasis: "Design",
    body: "End-to-end product design for software that earns its place. Discovery, systems, flows and interfaces — designed as a single, considered organism.",
    tags: ["Design Systems", "UX Research", "Prototyping", "Brand"],
  },
];

export function Services() {
  return (
    <section
      className="services"
      id="services"
      data-screen-label="05 Services"
    >
      <div className="container">
        <div className="section-head">
          <h2>
            What we <em>do.</em>
          </h2>
          <div className="meta">
            <span className="num">— 05 / Services</span>
            <p className="desc">
              Three disciplines, deeply practiced. Engaged solo or in
              combination, end-to-end.
            </p>
          </div>
        </div>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="service" key={s.num}>
              <div className="s-num">{s.num}</div>
              <h3 className="s-title">
                {s.prefix} <em>{s.emphasis}</em>
              </h3>
              <p className="s-body">{s.body}</p>
              <div className="s-tags">
                {s.tags.map((t) => (
                  <span className="s-tag" key={t}>
                    {t}
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
