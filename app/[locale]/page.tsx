import { setRequestLocale } from "next-intl/server";
import { Atmosphere, ClientEffects } from "@/components/atmosphere";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Vision } from "@/components/vision";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/footer";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Atmosphere />
      <Nav />
      <main>
        <Hero />
        <About />
        <Vision />
        <Projects />
        <Services />
        <Contact />
      </main>
      <SiteFooter />
      <ClientEffects />
    </>
  );
}
