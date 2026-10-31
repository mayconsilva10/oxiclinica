import { ArrowRight, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { HeroMotion } from "@/components/animations/HeroMotion";
import { OxygenParticles } from "@/components/animations/OxygenParticles";
import { HeroVisual, type HeroImage } from "@/components/sections/HeroVisual";
import { Button } from "@/components/ui/Button";
import { ADDRESS, SITE, TECHNICAL_RESPONSIBLE, WHATSAPP } from "@/lib/constants";

/**
 * Fotografia real da câmara hiperbárica (sem pessoas).
 * Enquanto for `null`, o Hero exibe a ilustração técnica provisória (ChamberIllustration).
 * Quando a foto chegar: salve em public/images/clinic/ e preencha, por exemplo:
 *   { src: "/images/clinic/camara-hiperbarica.webp", alt: "Câmara hiperbárica da Oxiclínica", width: 1200, height: 900 }
 */
const HERO_IMAGE: HeroImage | null = null;

/** Primeira dobra. Server Component; só a animação (HeroMotion) roda no cliente. */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative isolate overflow-hidden bg-brand-deep pt-header text-white"
    >
      {/* Fundo: gradiente discreto, grade técnica e partículas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_85%_30%,rgb(115_185_160/0.18),transparent_60%),radial-gradient(40rem_30rem_at_0%_100%,rgb(67_135_117/0.35),transparent_70%)]"
      />
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <OxygenParticles className="-z-10" />

      <HeroMotion className="container-site grid min-h-[calc(100svh-5rem)] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div className="max-w-2xl">
          <p
            data-hero="eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-mint sm:text-[0.8125rem]"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-brand-tech" />
            {SITE.tagline}
          </p>

          <h1
            id="inicio-titulo"
            className="mt-6 text-[clamp(2rem,9vw,2.5rem)] font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.75rem]"
          >
            <span data-hero="title" className="block">
              Tecnologia hiperbárica.
            </span>{" "}
            <span data-hero="title" className="block text-brand-tech">
              Cuidado especializado.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Uma abordagem médica especializada que utiliza oxigênio sob pressão para auxiliar no
            tratamento de determinadas condições clínicas.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <div data-hero="actions">
              <Button
                href="#tratamento"
                variant="light"
                size="lg"
                className="w-full sm:w-auto"
                icon={
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-[translate] duration-300 motion-safe:group-hover:translate-x-0.5"
                  />
                }
              >
                Conheça o tratamento
              </Button>
            </div>
            <div data-hero="actions">
              <Button
                href={WHATSAPP.url}
                data-cta="whatsapp"
                variant="outline-light"
                size="lg"
                className="w-full sm:w-auto"
                leadingIcon={<MessageCircle aria-hidden className="size-4" />}
                aria-label="Fale com nossa equipe pelo WhatsApp (abre em nova aba)"
              >
                Fale com nossa equipe
              </Button>
            </div>
          </div>

          <ul
            data-hero="meta"
            className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/75 sm:flex-row sm:gap-8"
          >
            <li className="flex items-start gap-2">
              <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-tech" />
              <span>
                {TECHNICAL_RESPONSIBLE.role}: {TECHNICAL_RESPONSIBLE.name} — {TECHNICAL_RESPONSIBLE.crm}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-tech" />
              <span>
                {ADDRESS.city}/{ADDRESS.state}
              </span>
            </li>
          </ul>
        </div>

        <div data-hero="visual" className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
          <HeroVisual image={HERO_IMAGE} />
        </div>
      </HeroMotion>
    </section>
  );
}
