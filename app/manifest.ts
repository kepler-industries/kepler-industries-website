import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kepler Industries",
    short_name: "Kepler",
    description:
      "Kepler Industries conçoit et développe des applications mobiles, des sites web et des logiciels sur mesure.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    categories: ["business", "productivity"],
    lang: "fr",
    icons: [
      {
        src: "/kepler.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/kepler.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
