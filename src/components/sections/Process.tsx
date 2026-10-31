import { Activity, ClipboardList, Clock, ListChecks, MessageCircle, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SESSION_DURATION, WHATSAPP } from "@/lib/constants";

/* PENDENTE validação do Dr. Aroldo: descrição das etapas da jornada (planejamento 3.5). */
const STEPS = [
  {
    icon: Stethoscope,
    title: "Avaliação médica",
    text: "Análise da condição clínica, do histórico e da indicação da oxigenoterapia hiperbárica.",
  },
  {
    icon: ListChecks,
    title: "Preparação",
    text: "Orientações sobre o tratamento e os cuidados necessários antes de cada sessão.",
  },
  {
    icon: ClipboardList,
    title: "Sessão hiperbárica",
    text: "Realização da sessão na câmara, sob acompanhamento profissional durante todo o procedimento.",
  },
  {
    icon: Activity,
    title: "Acompanhamento",
    text: "Monitoramento da evolução e definição das próximas sessões conforme o plano de tratamento.",
  },
] as const;

/**
 * Jornada do paciente (#jornada). Server Component.
 * Etapa 4: animar `[data-timeline-progress]` (scaleX no desktop / scaleY no mobile, já com
 * transform-origin definido) conforme a rolagem dentro de `[data-timeline]`. Sem JS a linha
 * aparece preenchida.
 */
export function Process() {
  return (
    <section
      id="jornada"
      aria-labelledby="jornada-titulo"
      className="py-section lg:py-section-lg"
      data-reveal-section
    >
      <div className="container-site">
        <SectionHeading
          reveal
          id="jornada-titulo"
          align="center"
          eyebrow="Como funciona"
          title="A jornada do paciente"
          description="Do primeiro contato ao acompanhamento, cada etapa é conduzida com orientação e cuidado."
        />

        <div className="relative mt-14 lg:mt-16" data-timeline>
          {/* Trilha horizontal (desktop): passa pelo centro dos marcadores (size-14 → 1.75rem) */}
          <div
            aria-hidden
            className="absolute inset-x-[12.5%] top-7 hidden h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-line lg:block"
            data-timeline-track="horizontal"
          >
            <div className="h-full w-full origin-left bg-brand" data-timeline-progress />
          </div>
          {/* Trilha vertical (mobile/tablet) */}
          <div
            aria-hidden
            className="absolute bottom-7 left-7 top-7 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-line lg:hidden"
            data-timeline-track="vertical"
          >
            <div className="h-full w-full origin-top bg-brand" data-timeline-progress />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="flex gap-5 lg:flex-col lg:items-center lg:text-center"
                data-timeline-step={i + 1}
              >
                <span
                  className="relative flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-white text-brand shadow-soft"
                  data-timeline-marker
                >
                  <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                </span>
                <div className="pt-1 lg:pt-0">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-brand-strong">
                    Etapa {i + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{title}</h3>
                  <p className="mt-2 max-w-xs leading-relaxed text-ink-muted lg:mx-auto">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div
          className="mx-auto mt-14 flex max-w-2xl items-start gap-3 rounded-card border border-line bg-brand-soft/60 p-5 sm:items-center sm:p-6"
          data-reveal
        >
          <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-brand sm:mt-0" />
          <p className="text-[0.9375rem] leading-relaxed text-ink">
            As sessões geralmente duram de <strong className="font-semibold">{SESSION_DURATION}</strong>,
            podendo variar conforme a prescrição e o protocolo médico.
          </p>
        </div>

        <div className="mt-10 flex justify-center" data-reveal>
          <Button
            href={WHATSAPP.url}
            data-cta="whatsapp"
            leadingIcon={<MessageCircle aria-hidden className="size-4" />}
          >
            Agendar avaliação
          </Button>
        </div>
      </div>
    </section>
  );
}
