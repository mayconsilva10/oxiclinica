import { ClinicJsonLd } from "@/components/seo/ClinicJsonLd";
import { ScrollAnimations } from "@/components/animations/ScrollAnimations";
import { About } from "@/components/sections/About";
import { Clinic } from "@/components/sections/Clinic";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Insurance } from "@/components/sections/Insurance";
import { Process } from "@/components/sections/Process";
import { Treatments } from "@/components/sections/Treatments";

/*
 * Landing page. Fundos alternados: Hero (verde profundo) → branco → #EAF4EF → branco → ...
 * Ids de âncora do header: inicio, tratamento, indicacoes, clinica, contato (extras: jornada, convenios).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Treatments />
      <Process />
      <Clinic />
      <Insurance />
      <Contact />
      <ScrollAnimations />
      <ClinicJsonLd />
    </>
  );
}
