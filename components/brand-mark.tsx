export function BrandMark() {
  return (
    <span className="brand-mark">
      <svg viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="3.5" fill="#ff6a17" />
        <ellipse
          cx="13"
          cy="13"
          rx="11"
          ry="4"
          stroke="#ff8a3c"
          strokeWidth="1"
          opacity="0.7"
        />
        <ellipse
          cx="13"
          cy="13"
          rx="11"
          ry="4"
          stroke="#ff8a3c"
          strokeWidth="1"
          opacity="0.4"
          transform="rotate(60 13 13)"
        />
        <ellipse
          cx="13"
          cy="13"
          rx="11"
          ry="4"
          stroke="#ff8a3c"
          strokeWidth="1"
          opacity="0.4"
          transform="rotate(-60 13 13)"
        />
      </svg>
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
