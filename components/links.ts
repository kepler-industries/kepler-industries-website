// Liens vers les autres sites du studio, sans redirection intermédiaire.

/** Connexion à l'espace client (Kepler Business). `/espace` faisait 308 puis 302. */
export const CLIENT_SPACE_URL =
  "https://business.kepler-industries.com/dashboard/login";

/** Site de Powr dans la même langue (la racine fait 307 vers `/en/`). */
export const powrUrl = (locale: string) =>
  `https://www.powr-app.com/${locale === "fr" ? "fr" : "en"}/`;
