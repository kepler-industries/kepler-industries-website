import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kepler Industries",
    short_name: "Kepler",
    description:
      "Kepler Industries is an independent creative studio designing and building clean, ambitious digital products — interfaces, brands and software at the edge of what's possible.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#07060a",
    theme_color: "#07060a",
    categories: ["design", "business", "productivity"],
    lang: "en",
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
