import { CheckIcon, Glyph, LockIcon } from "./icons";

// Maquettes illustratives des projets, dessinées en CSS/SVG dans la DA du site.
type T = (key: string) => string;

function Qr() {
  // Motif déterministe (illustratif) : 21×21 modules + trois repères.
  const n = 21;
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const cells: string[] = [];
  const finder = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < 7 && y < 7;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const inF =
        finder(x, y) || finder(x - (n - 7), y) || finder(x, y - (n - 7));
      if (inF) continue;
      if (rnd() > 0.52) cells.push(`M${x} ${y}h1v1h-1z`);
    }
  }
  const ring = (x: number, y: number) =>
    `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`;
  return (
    <svg viewBox="0 0 21 21" aria-hidden="true">
      <path
        fill="#0b0b0b"
        fillRule="evenodd"
        d={`${ring(0, 0)}${ring(n - 7, 0)}${ring(0, n - 7)}${cells.join("")}`}
      />
    </svg>
  );
}

function PowrVisual({ t }: { t: T }) {
  const sets = [
    { n: 1, v: "80 kg × 8", done: true },
    { n: 2, v: "82,5 kg × 8", done: true },
    { n: 3, v: "85 kg × 6", done: false },
  ];
  const bars = [38, 62, 48, 80, 70, 92, 56];
  return (
    <div className="mock m-phone">
      <div className="m-island" />
      <div className="m-label">{t("powr.program")}</div>
      <div className="m-title">{t("powr.exercise")}</div>
      <div className="powr-sets">
        {sets.map((s) => (
          <div key={s.n} className={`powr-set${s.done ? "" : " current"}`}>
            <span className="n">{s.n}</span>
            <span>{s.v}</span>
            <span className="ok">{s.done ? <CheckIcon /> : null}</span>
          </div>
        ))}
      </div>
      <div className="powr-rest">
        <span>{t("powr.rest")}</span>
        <b>1:45</b>
      </div>
      <div className="m-label" style={{ marginTop: 16 }}>
        {t("powr.volume")}
      </div>
      <div className="powr-bars">
        {bars.map((b, i) => (
          <i key={i} style={{ height: `${b}%`, opacity: 0.45 + i * 0.08 }} />
        ))}
      </div>
    </div>
  );
}

function RituelVisual({ t }: { t: T }) {
  return (
    <div className="mock m-wallet">
      <div className="pass back-2" />
      <div className="pass back-1" />
      <div className="pass front">
        <div className="pass-top">
          <span className="pass-logo">
            <Glyph name="rituel" />
          </span>
          {t("rituel.shop")}
        </div>
        <div className="m-label">{t("rituel.card")}</div>
        <div className="stamps">
          {Array.from({ length: 10 }, (_, i) => (
            <i key={i} className={i < 7 ? "on" : undefined}>
              {i < 7 ? <CheckIcon /> : null}
            </i>
          ))}
        </div>
        <div className="pass-reward">{t("rituel.reward")}</div>
        <div className="pass-qr">
          <Qr />
        </div>
      </div>
    </div>
  );
}

function OrbitVisual({ t }: { t: T }) {
  return (
    <div className="mock m-window">
      <div className="m-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="orbit-body">
        <div className="orbit-side">
          <i className="on" />
          <i />
          <i />
          <i />
        </div>
        <div className="orbit-main">
          <div className="orbit-tabs">
            <b>{t("orbit.library")}</b>
            <span>{t("orbit.news")}</span>
          </div>
          <div className="orbit-banner">
            <span className="m-label">Minecraft · Modpack</span>
            <strong>Cobblemon : Star Academy</strong>
          </div>
          <div className="orbit-row">
            <span className="orbit-play">{t("orbit.play")}</span>
            <span className="orbit-progress">
              <span>
                {t("orbit.update")} <b>87 %</b>
              </span>
              <i />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LittoralVisual({ t }: { t: T }) {
  return (
    <div className="mock m-phone lock">
      <div className="m-island" />
      <div className="lock-date">{t("littoral.date")}</div>
      <div className="lock-time">12:41</div>
      <div className="live">
        <div className="live-top">
          <span className="live-icon">
            <Glyph name="littoral" />
          </span>
          Littoral Food · {t("littoral.status")}
        </div>
        <strong>{t("littoral.eta")}</strong>
        <div className="live-track" />
        <div className="live-ends">
          <span>12:33</span>
          <span>12:49</span>
        </div>
      </div>
    </div>
  );
}

function BusinessVisual({ t }: { t: T }) {
  const feed = [
    { label: t("business.quote"), id: "D-0142", c: "#a78bfa" },
    { label: t("business.invoice"), id: "F-0218", c: "#4ade80" },
    { label: t("business.contract"), id: "C-0031", c: "#5b8cff" },
  ];
  return (
    <div className="mock m-dash">
      <div className="dash-chart">
        <div className="m-title">{t("business.title")}</div>
        <span className="uptime">{t("business.uptime")}</span>
        <svg viewBox="0 0 300 130" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5b8cff" stopOpacity="0.45" />
              <stop offset="1" stopColor="#5b8cff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[30, 65, 100].map((y) => (
            <line
              key={y}
              x1="0"
              x2="300"
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
            />
          ))}
          <path
            d="M0 104 C30 98 45 70 75 76 S120 96 150 68 S200 30 230 44 S275 22 300 12 V130 H0Z"
            fill="url(#dash-fill)"
          />
          <path
            d="M0 104 C30 98 45 70 75 76 S120 96 150 68 S200 30 230 44 S275 22 300 12"
            fill="none"
            stroke="#8fb0ff"
            strokeWidth="2"
          />
          <circle cx="300" cy="12" r="4" fill="#fff" />
        </svg>
      </div>
      <div className="dash-feed">
        {feed.map((f) => (
          <div
            key={f.id}
            className="feed-item"
            style={{ "--c": f.c } as React.CSSProperties}
          >
            <b>{f.label}</b>
            <span>{f.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const WAVE =
  "M0 40 C 60 20, 120 20, 180 40 S 300 60, 360 40 S 480 20, 540 40 S 660 60, 720 40 V90 H0Z";

function SaunactivVisual({ t }: { t: T }) {
  return (
    <div className="mock m-window">
      <div className="m-bar">
        <i />
        <i />
        <i />
        <span className="m-url">
          <LockIcon />
          saunactiv-ocean.fr
        </span>
      </div>
      <div className="sa-site">
        <div className="m-label">Trestel · Beg-Leguer · Côtes-d’Armor</div>
        <div className="sa-title">
          {t("saunactiv.title")}
          <em>{t("saunactiv.accent")}</em>
        </div>
        <span className="sa-cta">{t("saunactiv.cta")} →</span>
        <div className="sa-waves" aria-hidden="true">
          <svg viewBox="0 0 720 90" preserveAspectRatio="none">
            <path d={WAVE} fill="rgba(147,197,253,0.18)" />
          </svg>
          <svg viewBox="0 0 720 90" preserveAspectRatio="none">
            <path d={WAVE} fill="#efe6d4" transform="translate(0 18)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const VISUALS: Record<string, (p: { t: T }) => React.ReactElement> = {
  powr: PowrVisual,
  rituel: RituelVisual,
  orbit: OrbitVisual,
  littoral: LittoralVisual,
  business: BusinessVisual,
  saunactiv: SaunactivVisual,
};

export function ProjectVisual({ id, t }: { id: string; t: T }) {
  const V = VISUALS[id];
  return V ? <V t={t} /> : null;
}
