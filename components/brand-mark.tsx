// Marque Kepler Industries : le « K pochoir », trois pièces détachées, en monochrome.
export function KeplerMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label="Kepler Industries"
    >
      <rect x="3.5" y="3" width="3.6" height="18" />
      <path d="M9.4 10.6 16.8 3h4.4l-7.4 7.6z" />
      <path d="M11.2 12.4h4.4l5.6 8.6h-4.4z" />
    </svg>
  );
}

export function BrandLink({
  href = "#top",
  ariaLabel,
}: {
  href?: string;
  ariaLabel?: string;
}) {
  return (
    <a href={href} className="brand" aria-label={ariaLabel}>
      <KeplerMark />
      <span>
        Kepler <span className="brand-sub">Industries</span>
      </span>
    </a>
  );
}

export function ArrowIcon({ className = "arrow" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 7h10m0 0L7 2m5 5l-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3 9l6-6M4 3h5v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
