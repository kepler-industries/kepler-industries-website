import { ImageResponse } from "next/og";

export const alt = "Kepler Industries — Du concept au code";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 60% 70% at 78% 45%, #1a1630 0%, #000 70%)",
          color: "#f2f2f2",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "-0.03em",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#f2f2f2">
            <rect x="3.5" y="3" width="3.6" height="18" />
            <path d="M9.4 10.6 16.8 3h4.4l-7.4 7.6z" />
            <path d="M11.2 12.4h4.4l5.6 8.6h-4.4z" />
          </svg>
          <span style={{ display: "flex", gap: 10 }}>
            Kepler <span style={{ color: "#6f7275" }}>Industries</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                fontSize: 128,
                lineHeight: 0.95,
                fontFamily: "serif",
                letterSpacing: "-0.02em",
                display: "flex",
                flexDirection: "column",
                color: "#f2f2f2",
              }}
            >
              <span>Du concept</span>
              <span>au code.</span>
            </div>
          </div>
          <svg width="260" height="260" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="k" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#3a3a40" />
                <stop offset="0.5" stopColor="#0c0c0e" />
                <stop offset="1" stopColor="#1c1c22" />
              </linearGradient>
            </defs>
            <g fill="url(#k)" stroke="#a5b4fc" strokeOpacity="0.55" strokeWidth="0.12">
              <rect x="3.5" y="3" width="3.6" height="18" />
              <path d="M9.4 10.6 16.8 3h4.4l-7.4 7.6z" />
              <path d="M11.2 12.4h4.4l5.6 8.6h-4.4z" />
            </g>
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#a1a4a5",
          }}
        >
          <span>Applications · Sites web · Logiciels sur mesure</span>
          <span>kepler-industries.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
