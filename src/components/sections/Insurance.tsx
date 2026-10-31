import { BadgeCheck, ExternalLink, Info, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INSURANCE, WHATSAPP } from "@/lib/constants";

/**
 * Convênios (#convenios). Server Component.
 * Apenas a Unimed Presidente Prudente (confirmação documental). Não listar outros convênios
 * sem confirmação; não usar a logomarca da Unimed.
 */
export function Insurance() {
  return (
    <section
      id="convenios"
      aria-labelledby="convenios-titulo"
      className="py-section lg:py-section-lg"
      data-reveal-section
    >
      <div className="container-site">
        <div className="grid gap-10 rounded-media border border-line bg-white p-6 shadow-soft sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:p-14"
          data-reveal
        >
          <div className="flex flex-col gap-6">
            <SectionHeading
              id="convenios-titulo"
              eyebrow="Convênios"
              title="Atendimento credenciado"
              description="A Oxiclínica faz parte da rede credenciada da Unimed Presidente Prudente."
            />
            <p className="flex max-w-xl gap-3 text-pretty leading-relaxed text-ink-muted">
              <Info aria-hidden className="mt-1 size-5 shrink-0 text-brand" />
              <span>
                Cobertura, autorização e disponibilidade do tratamento podem variar conforme o seu
                plano. Antes de agendar, consulte nossa equipe para verificar as condições do seu
                caso.
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                href={WHATSAPP.url}
                data-cta="whatsapp"
                leadingIcon={<MessageCircle aria-hidden className="size-4" />}
              >
                Consultar cobertura
              </Button>
              <Button
                href={INSURANCE.url}
                data-cta="insurance"
                variant="secondary"
                icon={<ExternalLink aria-hidden className="size-4" />}
              >
                Ver no guia médico Unimed
              </Button>
            </div>
          </div>

          {/* Badge textual (sem logomarca da Unimed) */}
          <div className="flex items-center gap-5 rounded-card bg-brand-soft p-6 sm:p-8">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-soft">
              <BadgeCheck aria-hidden className="size-7" strokeWidth={1.75} />
            </span>
            <p>
              <span className="block font-display text-xs font-bold uppercase tracking-[0.16em] text-brand-strong">
                Convênio credenciado
              </span>
              <span className="mt-1 block font-display text-2xl font-bold text-ink">
                {INSURANCE.name}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
