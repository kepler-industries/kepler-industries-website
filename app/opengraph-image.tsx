import { ImageResponse } from "next/og";

export const alt = "Kepler Industries — Studio for ambitious digital products";
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
          padding: "80px",
          background:
            "radial-gradient(ellipse at top right, #1a1224 0%, #07060a 55%)",
          color: "#f4eee5",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#b9b1a4",
            fontFamily: "sans-serif",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#f4eee5">
              <rect x="3.5" y="3" width="3.6" height="18" />
              <path d="M9.4 10.6 16.8 3h4.4l-7.4 7.6z" />
              <path d="M11.2 12.4h4.4l5.6 8.6h-4.4z" />
            </svg>
            K-01 · Kepler Industries
          </span>
          <span>EST. 2021</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6e6557",
              fontFamily: "sans-serif",
            }}
          >
            Studio for ambitious digital products
          </div>
          <div
            style={{
              fontSize: 110,
              lineHeight: 1.02,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            Building beyond the known horizon.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#b9b1a4",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", gap: 36 }}>
            <span>Web</span>
            <span>·</span>
            <span>App</span>
            <span>·</span>
            <span>Product</span>
          </div>
          <div style={{ letterSpacing: "0.14em" }}>
            kepler-industries.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
