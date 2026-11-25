import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/layout/Intro";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Security } from "@/components/sections/Security";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Intro />
      <ScrollProgress />
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Security />
        <Certifications />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
