type Project = {
  num: string;
  prefix: string;
  emphasis: string;
  type: string;
  year: string;
};

const PROJECTS: Project[] = [
  {
    num: "001",
    prefix: "Atlas",
    emphasis: "Field",
    type: "Brand · Web",
    year: "2026",
  },
  {
    num: "002",
    prefix: "Northstar",
    emphasis: "OS",
    type: "Product · Native App",
    year: "2025",
  },
  {
    num: "003",
    prefix: "Tessera",
    emphasis: "Audio",
    type: "Web · Identity",
    year: "2025",
  },
  {
    num: "004",
    prefix: "Caldera",
    emphasis: "Health",
    type: "Product · Design System",
    year: "2024",
  },
  {
    num: "005",
    prefix: "Helix",
    emphasis: "Capital",
    type: "Brand · Marketing Site",
    year: "2024",
  },
  {
    num: "006",
    prefix: "Meridian",
    emphasis: "Letters",
    type: "Editorial · Web",
    year: "2023",
  },
];

export function Projects() {
  return (
    <section
      className="projects"
      id="projects"
      data-screen-label="04 Projects"
    >
      <div className="container">
        <div className="section-head">
          <h2>
            Selected <em>work.</em>
          </h2>
          <div className="meta">
            <span className="num">— 04 / Projects · 2023–2026</span>
            <p className="desc">
              A curated set of recent missions. Each shipped, each shaped by
              the same studio principles.
            </p>
          </div>
        </div>

        <div className="project-list">
          {PROJECTS.map((p) => (
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
