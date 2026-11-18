import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.kepler-industries.com";

type Props = {
  locale: string;
  name: string;
  description: string;
};

export function JsonLd({ locale, name, description }: Props) {
  const url =
    locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Kepler Industries",
    alternateName: ["Kepler"],
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
    description,
    foundingDate: "2021",
    slogan: "Du concept au code.",
    knowsAbout: [
      "Développement d'applications mobiles",
      "Développement web",
      "Logiciels sur mesure",
      "Design produit",
      "React Native",
      "Next.js",
    ],
    sameAs: ["https://github.com/kepler-industries"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@kepler-industries.com",
      availableLanguage: ["French", "English"],
      areaServed: "FR",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Kepler Industries",
    description,
    inLanguage: routing.locales,
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    primaryImageOfPage: { "@id": `${BASE_URL}/#logo` },
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#service`,
    name: "Kepler Industries",
    description,
    url: BASE_URL,
    image: `${BASE_URL}/kepler.png`,
    areaServed: "FR",
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services du studio",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Applications mobiles",
            description:
              "Applications iOS et Android, de la maquette à la publication sur l'App Store et Google Play.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sites & plateformes web",
            description:
              "Sites vitrines, plateformes SaaS, espaces clients et back-offices sur mesure.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Logiciels sur mesure",
            description:
              "API, outils métier, automatisations, intégrations IA et applications desktop.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hébergement & suivi",
            description:
              "Mise en ligne, supervision, sauvegardes et maintenance des produits livrés.",
          },
        },
      ],
    },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, webpage, professionalService],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
