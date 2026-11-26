import { getTranslations } from "next-intl/server";
import { BASE_URL, localeUrl, routing } from "@/i18n/routing";
import { CONTACT_EMAIL as EMAIL } from "./email";

// Seulement des faits affichés sur la page : nom, logo, description, adresse
// de contact (pied de page), GitHub (pied de page), « depuis 2021 » (section
// Méthode), « Conçu et développé en France » et les quatre services. Pas
// d'adresse postale, de téléphone ni de numéro d'entreprise : le site n'en
// affiche pas.

type ServiceItem = { id: string; title: string; body: string };

export async function JsonLd({ locale }: { locale: string }) {
  const meta = await getTranslations({ locale, namespace: "Metadata" });
  const hero = await getTranslations({ locale, namespace: "Hero" });
  const footer = await getTranslations({ locale, namespace: "Footer" });
  const services = await getTranslations({ locale, namespace: "Services" });
  const items = services.raw("items") as ServiceItem[];
  const url = localeUrl(locale);

  const organization = {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Kepler Industries",
    alternateName: "Kepler",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${BASE_URL}/#logo`,
      url: `${BASE_URL}/kepler.png`,
      contentUrl: `${BASE_URL}/kepler.png`,
      width: 512,
      height: 512,
      caption: "Kepler Industries",
    },
    image: { "@id": `${BASE_URL}/#logo` },
    description: footer("tagline"),
    slogan: `${hero("titleLine1")} ${hero("titleLine2")}`,
    foundingDate: "2021",
    email: EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: EMAIL,
      availableLanguage: ["French", "English"],
    },
    address: { "@type": "PostalAddress", addressCountry: "FR" },
    sameAs: ["https://github.com/kepler-industries"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: services("eyebrow"),
      itemListElement: items.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.body,
          provider: { "@id": `${BASE_URL}/#organization` },
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Kepler Industries",
    alternateName: "Kepler",
    inLanguage: [...routing.locales],
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: meta("title"),
    description: meta("description"),
    inLanguage: locale,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, webpage],
  };

  return (
    <script
      type="application/ld+json"
      // `<` échappé : aucune chaîne ne peut fermer la balise <script>.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
