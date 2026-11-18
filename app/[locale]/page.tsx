import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Stack } from "@/components/stack";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/footer";
import { Effects } from "@/components/effects";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
