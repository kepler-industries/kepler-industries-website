import type { CSSProperties, ReactNode } from "react";

// Pictogrammes au trait, dessinés pour les tuiles brillantes.
const glyphs: Record<string, ReactNode> = {
  // Projets
  powr: (
    <path d="M13.5 2.5 5 13.2h6l-1 8.3 8.5-10.7h-6z" strokeLinejoin="round" />
  ),
  rituel: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <circle cx="8" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="16" cy="12" r="1.6" strokeDasharray="1.6 1.4" />
    </>
  ),
  orbit: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.6"
        transform="rotate(-20 12 12)"
      />
    </>
  ),
  littoral: (
    <>
      <path d="M3 9.5c2.2-1.6 4.3-1.6 6.5 0s4.3 1.6 6.5 0 3.6-1.3 5 -.6" />
      <path d="M3 14.5c2.2-1.6 4.3-1.6 6.5 0s4.3 1.6 6.5 0 3.6-1.3 5-.6" />
      <path d="M3 19.5c2.2-1.6 4.3-1.6 6.5 0s4.3 1.6 6.5 0 3.6-1.3 5-.6" />
    </>
  ),
  business: (
    <>
      <path d="M6 3h8.5L19 7.5V21H6z" strokeLinejoin="round" />
      <path d="M14 3v5h5M9 12h6M9 15.5h6M9 19h3.5" />
    </>
  ),
  saunactiv: (
    <>
      <circle cx="12" cy="9" r="3.6" />
      <path d="M12 2v1.5M5.6 4.6l1 1M18.4 4.6l-1 1M3 9h1.5M19.5 9H21" />
      <path d="M3 17c2.2-1.6 4.3-1.6 6.5 0s4.3 1.6 6.5 0 3.6-1.3 5-.6" />
    </>
  ),
  qlp: (
    <>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </>
  ),
  star: (
    <path
      d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6-4.5-4.2 6.1-.7z"
      strokeLinejoin="round"
    />
  ),
  empowered: (
    <>
      <path d="M7 12h10" />
      <rect x="4" y="7.5" width="3" height="9" rx="1" />
      <rect x="17" y="7.5" width="3" height="9" rx="1" />
      <path d="M2 10v4M22 10v4" />
    </>
  ),
  flux: (
    <>
      <path d="M3 8h13l-3-3M21 16H8l3 3" strokeLinejoin="round" />
    </>
  ),
  // Services
  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.8" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  web: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 8.5h19" />
      <circle cx="5.5" cy="6.3" r=".4" />
      <circle cx="7.4" cy="6.3" r=".4" />
    </>
  ),
  software: (
    <>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" strokeLinejoin="round" />
    </>
  ),
  care: (
    <>
      <path d="M3 12h4l2.2-5 3.6 10 2.4-5H21" strokeLinejoin="round" />
    </>
  ),
  // En-têtes de section
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 4.5-9 4.5-9-4.5z" strokeLinejoin="round" />
      <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" strokeLinejoin="round" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3 6.5 9 6.5 9-6.5" strokeLinejoin="round" />
    </>
  ),
};

export function Glyph({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {glyphs[name]}
    </svg>
  );
}

export function Tile({
  glyph,
  accent,
  size,
  className,
}: {
  glyph: string;
  accent?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const style = accent ? ({ "--accent": accent } as CSSProperties) : undefined;
  return (
    <span
      className={["tile", size, className].filter(Boolean).join(" ")}
      style={style}
      aria-hidden="true"
    >
      <Glyph name={glyph} />
    </span>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="m2.5 6.2 2.3 2.3 4.7-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <rect x="2" y="4.5" width="6" height="4.5" rx="1" fill="currentColor" />
      <path d="M3.3 4.5V3.3a1.7 1.7 0 0 1 3.4 0v1.2" stroke="currentColor" />
    </svg>
  );
}
