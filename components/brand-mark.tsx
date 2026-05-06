import Image from "next/image";
import keplerLogo from "@/public/kepler.png";

export function BrandMark() {
  return (
    <span className="brand-mark">
      <Image
        src={keplerLogo}
        alt="Kepler Industries"
        width={26}
        height={26}
        priority
      />
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
