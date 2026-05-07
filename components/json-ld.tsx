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
    alternateName: ["Kepler", "Kepler Studio"],
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
    slogan: "Building beyond the known horizon.",
    knowsAbout: [
      "Web Design",
      "App Development",
      "Product Design",
      "Brand Design",
      "Design Systems",
      "User Experience",
      "User Interface Design",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@kepler-industries.com",
      availableLanguage: ["English", "French", "Spanish", "Italian", "German"],
      areaServed: "Worldwide",
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
    alternateName: "Kepler",
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
    priceRange: "$$$",
    areaServed: "Worldwide",
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Studio Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Design",
            description:
              "Marketing sites, product pages, and interactive experiences engineered for clarity and impact.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "App Development",
            description:
              "Native and cross-platform apps from first prototype to production-grade software.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Product Design",
            description:
              "End-to-end product design — discovery, systems, flows and interfaces designed as one organism.",
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
