import { Gauge, Timer, Wind } from "lucide-react";
import { ChamberIllustration } from "@/components/sections/ChamberIllustration";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

/*
 * PENDENTE validação do Dr. Aroldo: todos os textos desta seção (linguagem educativa,
 * sem valores de pressão, parâmetros fisiológicos, taxas de sucesso ou promessas de cura).
 */

/** Legenda da ilustração — a ordem corresponde a CHAMBER_CALLOUTS. */
const CHAMBER_PARTS = [
  {
    title: "Câmara pressurizada",
    text: "Estrutura cilíndrica e vedada, projetada para manter, com segurança, um ambiente com pressão maior que a do ar ao nosso redor.",
  },
  {
    title: "Visores",
    text: "Permitem o contato visual entre o paciente e a equipe durante toda a sessão.",
  },
  {
    title: "Porta com vedação",
    text: "Mantém a câmara fechada de forma segura enquanto o procedimento acontece.",
  },
  {
    title: "Controle de pressão e oxigênio",
    text: "A pressurização e a despressurização são graduais e controladas pela equipe.",
  },
  {
    title: "Comunicação e monitoramento",
    text: "O paciente pode se comunicar com a equipe, que acompanha a sessão do início ao fim.",
  },
] as const;

const TOPICS = [
  {
    icon: Gauge,
    title: "Como funciona a câmara",
    text: "A câmara hiperbárica é um equipamento fechado em que a pressão interna é elevada de forma controlada. Lá dentro, o paciente respira oxigênio em alta concentração, sempre sob supervisão da equipe.",
  },
  {
    icon: Timer,
    title: "Como é uma sessão",
    text: "O paciente fica acomodado confortavelmente enquanto a pressão aumenta aos poucos. É comum sentir algo nos ouvidos parecido com a descida de um avião — a equipe orienta como aliviar. Ao final, a pressão volta lentamente ao normal.",
  },
  {
    icon: Wind,
    title: "Por que oxigênio sob pressão",
    text: "Em um ambiente pressurizado, o organismo consegue transportar mais oxigênio dissolvido no sangue. Isso pode favorecer a oxigenação de tecidos com circulação comprometida e auxiliar processos como a cicatrização, como parte de um plano de tratamento definido pelo médico.",
  },
] as const;

/** Seção "O que é oxigenoterapia hiperbárica?" (#tratamento). Server Component. */
export function About() {
  return (
    <section
      id="tratamento"
      aria-labelledby="tratamento-titulo"
      className="py-section lg:py-section-lg"
      data-reveal-section
    >
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="flex flex-col gap-6" data-reveal>
            <SectionHeading
              id="tratamento-titulo"
              eyebrow="Tratamento"
              title="O que é oxigenoterapia hiperbárica?"
              description="É um tratamento médico em que o paciente respira oxigênio dentro de uma câmara pressurizada. Ele é utilizado como apoio no cuidado de determinadas condições clínicas, sempre com indicação e acompanhamento médico."
            />
            <p className="max-w-2xl text-pretty leading-relaxed text-ink-muted">
              A terapia não substitui os demais cuidados: costuma fazer parte de um plano de
              tratamento mais amplo, definido após avaliação individual. O número de sessões e o
              protocolo variam de acordo com cada caso.
            </p>
          </div>

          <figure
            className="relative overflow-hidden rounded-media bg-brand-deep p-5 shadow-soft sm:p-8"
            data-reveal="scale"
          >
            <div aria-hidden className="hero-blueprint absolute inset-0" />
            <ChamberIllustration idPrefix="camara-tratamento" callouts className="relative" />
            <figcaption className="relative mt-4 text-center text-xs text-white/75">
              Ilustração educativa e representativa — não corresponde a um equipamento específico.
            </figcaption>
          </figure>
        </div>

        {/* Componentes destacados na ilustração */}
        <ol
          aria-label="Componentes destacados na ilustração"
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          data-reveal-group
        >
          {CHAMBER_PARTS.map((part, i) => (
            <li
              key={part.title}
              className="flex gap-3 rounded-card border border-line p-4 transition-[border-color,background-color] duration-300 ease-out-soft hover:border-brand/40 hover:bg-brand-soft/60"
              data-reveal-item
              data-chamber-part={i + 1}
            >
              <span
                aria-hidden
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-deep font-display text-xs font-bold text-white"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm font-bold">{part.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{part.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-6 md:grid-cols-3" data-reveal-group>
          {TOPICS.map(({ icon: Icon, title, text }) => (
            <Card key={title} variant="soft" data-reveal-item>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-brand">
                <Icon aria-hidden className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
