import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { localeUrl, routing } from "@/i18n/routing";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Stack } from "@/components/stack";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/footer";
import { Effects } from "@/components/effects";
import { JsonLd } from "@/components/json-ld";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, localeUrl(l)]),
  );
  languages["x-default"] = localeUrl(routing.defaultLocale);

  return {
    alternates: {
      canonical: localeUrl(safeLocale),
      languages,
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd locale={locale} />
      <Nav />
      <div className="shell">
        <main>
          <Hero />
          <Stack />
          <Projects />
          <Services />
          <Process />
          <Contact />
        </main>
        <SiteFooter />
      </div>
      <Effects />
    </>
  );
}
