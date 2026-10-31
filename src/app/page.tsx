import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHATSAPP } from "@/lib/constants";

/*
 * Etapa 1: placeholders das seções com os ids das âncoras do header.
 * Cada seção será substituída pelo componente definitivo em src/components/sections/ (Etapas 2 e 3).
 */
export default function Home() {
  return (
    <>
      {/* Hero provisório — fundo verde profundo para validar o header transparente */}
      <section
        id="inicio"
        aria-labelledby="inicio-titulo"
        className="relative flex min-h-svh items-center overflow-hidden bg-brand-deep pt-header"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/2 size-[42rem] -translate-y-1/2 rounded-full border border-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-1/2 size-[28rem] -translate-y-1/2 rounded-full border border-brand-tech/20"
        />
        <div className="container-site relative py-section">
          <SectionHeading
            as="h1"
            id="inicio-titulo"
            tone="dark"
            eyebrow="Centro Médico Hiperbárico do Oeste Paulista"
            title="Tecnologia hiperbárica. Cuidado especializado."
            description="Uma abordagem médica especializada que utiliza oxigênio sob pressão para auxiliar no tratamento de determinadas condições clínicas."
          />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#tratamento" variant="light" size="lg" icon={<ArrowRight aria-hidden className="size-4" />}>
              Conheça o tratamento
            </Button>
            <Button
              href={WHATSAPP.url}
              variant="outline-light"
              size="lg"
              leadingIcon={<MessageCircle aria-hidden className="size-4" />}
            >
              Fale com nossa equipe
            </Button>
          </div>
        </div>
      </section>

      <section id="tratamento" aria-labelledby="tratamento-titulo" className="py-section lg:py-section-lg">
        <div className="container-site">
          <SectionHeading
            id="tratamento-titulo"
            eyebrow="Tratamento"
            title="O que é oxigenoterapia hiperbárica?"
            description="Seção em construção (Etapa 3)."
          />
        </div>
      </section>

      <section
        id="indicacoes"
        aria-labelledby="indicacoes-titulo"
        className="bg-brand-soft py-section lg:py-section-lg"
      >
        <div className="container-site">
          <SectionHeading
            id="indicacoes-titulo"
            align="center"
            eyebrow="Indicações"
            title="Indicações do tratamento"
            description="Seção em construção (Etapa 3). Indicações sempre condicionadas à avaliação médica."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Card de exemplo", "Card de exemplo", "Card de exemplo"].map((t, i) => (
              <Card key={i} interactive>
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-ink-muted">Placeholder do componente Card.</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="clinica" aria-labelledby="clinica-titulo" className="py-section lg:py-section-lg">
        <div className="container-site">
          <SectionHeading
            id="clinica-titulo"
            eyebrow="A clínica"
            title="Conheça a Oxiclínica"
            description="Seção em construção (Etapa 3)."
          />
        </div>
      </section>

      <section
        id="contato"
        aria-labelledby="contato-titulo"
        className="bg-brand-soft py-section lg:py-section-lg"
      >
        <div className="container-site">
          <SectionHeading
            id="contato-titulo"
            eyebrow="Contato"
            title="Contato e localização"
            description="Seção em construção (Etapas 3 e 5)."
          />
        </div>
      </section>
    </>
  );
}
