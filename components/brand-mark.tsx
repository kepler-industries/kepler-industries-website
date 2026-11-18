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

export function BrandMark() {
  return (
    <span className="brand-mark">
      <KeplerMark />
    </span>
  );
}

export function BrandLink({
  href = "#",
  ariaLabel,
}: {
  href?: string;
  ariaLabel?: string;
}) {
  return (
    <a href={href} className="brand" aria-label={ariaLabel}>
      <BrandMark />
      <span className="brand-name">
        Kepler<em>Industries</em>
      </span>
    </a>
  );
}

export function ArrowIcon({ className = "arrow" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none">
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
