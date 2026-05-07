import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { JsonLd } from "@/components/json-ld";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const BASE_URL = "https://www.kepler-industries.com";

const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  it: "it_IT",
  de: "de_DE",
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07060a" },
    { media: "(prefers-color-scheme: light)", color: "#07060a" },
  ],
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  const t = await getTranslations({
    locale: safeLocale,
    namespace: "Metadata",
  });

  const localeUrl = (l: string) =>
    l === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${l}`;

  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, localeUrl(l)]),
  );
  languages["x-default"] = BASE_URL;

  const ogLocaleAlternates = routing.locales
    .filter((l) => l !== safeLocale)
    .map((l) => OG_LOCALES[l]);

  return {
    title: {
      default: t("title"),
      template: "%s · Kepler Industries",
    },
    description: t("description"),
    metadataBase: new URL(BASE_URL),
    applicationName: "Kepler Industries",
    referrer: "origin-when-cross-origin",
    keywords: [
      "Kepler Industries",
      "Kepler Studio",
      "creative studio",
      "digital product studio",
      "web design studio",
      "app development studio",
      "product design",
      "brand design",
      "design system",
      "UX design",
      "UI design",
      "Next.js studio",
      "React studio",
      "independent design studio",
    ],
    authors: [{ name: "Kepler Industries", url: BASE_URL }],
    creator: "Kepler Industries",
    publisher: "Kepler Industries",
    category: "design",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: localeUrl(safeLocale),
      languages,
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: localeUrl(safeLocale),
      siteName: "Kepler Industries",
      locale: OG_LOCALES[safeLocale],
      alternateLocale: ogLocaleAlternates,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Kepler Industries — Studio for ambitious digital products",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
      creator: "@keplerindustries",
      site: "@keplerindustries",
      images: [
        {
          url: "/twitter-image",
          width: 1200,
          height: 630,
          alt: "Kepler Industries — Studio for ambitious digital products",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add Google Search Console verification token here once available:
      // google: "your-token-here",
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <JsonLd
          locale={locale}
          name={t("title")}
          description={t("description")}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
