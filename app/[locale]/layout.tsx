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
  fr: "fr_FR",
  en: "en_US",
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
  themeColor: "#000000",
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
      "studio de développement",
      "développement d'application mobile",
      "application iOS",
      "application Android",
      "création de site web",
      "logiciel sur mesure",
      "React Native",
      "Next.js",
      "agence web France",
      "mobile app development",
      "custom software",
    ],
    authors: [{ name: "Kepler Industries", url: BASE_URL }],
    creator: "Kepler Industries",
    publisher: "Kepler Industries",
    category: "technology",
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
          alt: t("ogAlt"),
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("twitterDescription"),
      creator: "@keplerindustries",
      site: "@keplerindustries",
      images: [
        {
          url: "/twitter-image",
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
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
      suppressHydrationWarning
    >
      <head>
        {/* Active les animations d'apparition seulement si le JS tourne. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
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
