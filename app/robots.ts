import type { MetadataRoute } from "next";
import { BASE_URL } from "@/i18n/routing";

// Pas de `Disallow: /_next/` : Google doit pouvoir lire le JS et le CSS pour
// afficher la page. Pas de `Host:` non plus (ignoré par Google) : l'hôte
// canonique est donné par la redirection 301 de l'apex et les canonical.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
