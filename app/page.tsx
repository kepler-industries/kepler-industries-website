import { Atmosphere, ClientEffects } from "@/components/atmosphere";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Vision } from "@/components/vision";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/footer";

export default function Home() {
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
