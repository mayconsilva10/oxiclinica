import {
  Bandage,
  Bone,
  ClipboardPlus,
  Flame,
  Footprints,
  Info,
  Layers,
  MessageCircle,
  ShieldPlus,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHATSAPP } from "@/lib/constants";

/*
 * PENDENTE validação do Dr. Aroldo: lista de condições (planejamento 3.4) e descrições curtas.
 * As descrições são propositalmente genéricas e condicionadas à avaliação médica.
 */
const CONDITIONS: readonly { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Footprints,
    title: "Pé diabético",
    text: "Lesões nos pés associadas ao diabetes, em que a terapia pode complementar o tratamento convencional.",
  },
  {
    icon: Bandage,
    title: "Feridas de difícil cicatrização",
    text: "Feridas que não evoluem como esperado apenas com os cuidados habituais.",
  },
  {
    icon: Bone,
    title: "Osteomielite",
    text: "Infecções ósseas, especialmente as de evolução prolongada, como terapia complementar.",
  },
  {
    icon: ShieldPlus,
    title: "Síndrome de Fournier",
    text: "Infecção grave de tecidos moles, em que a terapia pode integrar o tratamento hospitalar e cirúrgico.",
  },
  {
    icon: Flame,
    title: "Queimaduras",
    text: "Em situações selecionadas, como apoio à recuperação dos tecidos atingidos.",
  },
  {
    icon: Layers,
    title: "Úlceras de pressão ou venosas",
    text: "Lesões crônicas da pele que podem ter indicação conforme a avaliação de cada caso.",
  },
  {
    icon: ClipboardPlus,
    title: "Complicações pós-operatórias",
    text: "Determinadas complicações após cirurgias, como alterações na cicatrização da ferida operatória.",
  },
  {
    icon: Stethoscope,
    title: "Outras condições",
    text: "Outras situações clínicas podem ser avaliadas pelo médico para verificar se há indicação.",
  },
];

/** Seção "Indicações do tratamento" (#indicacoes). Server Component. */
export function Treatments() {
  return (
    <section
      id="indicacoes"
      aria-labelledby="indicacoes-titulo"
      className="bg-brand-soft py-section lg:py-section-lg"
      data-reveal-section
    >
      <div className="container-site">
        <SectionHeading
          reveal
          id="indicacoes-titulo"
          align="center"
          eyebrow="Indicações"
          title="Quando a oxigenoterapia pode ser indicada"
          description="A terapia pode fazer parte do tratamento de diferentes condições clínicas. Conheça algumas delas."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6" data-reveal-group>
          {CONDITIONS.map(({ icon: Icon, title, text }) => (
            <Card as="li" key={title} interactive className="flex flex-col" data-reveal-item>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <Icon aria-hidden className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{text}</p>
            </Card>
          ))}

          {/* Aviso: ocupa a célula restante do grid de 3 colunas (8 cards + aviso = 9) */}
          <li
            className="flex flex-col justify-between gap-6 rounded-card bg-brand-deep p-6 text-white sm:col-span-2 sm:p-8 lg:col-span-1"
            data-reveal-item
          >
            <div className="flex gap-3">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-tech" />
              <p className="leading-relaxed">
                <strong className="font-display font-bold">A indicação depende de avaliação médica.</strong>{" "}
                <span className="text-white/75">
                  As condições acima são exemplos e não substituem a consulta. Somente o médico
                  pode definir se a oxigenoterapia hiperbárica é adequada para cada caso.
                </span>
              </p>
            </div>
            <Button
              href={WHATSAPP.url}
              data-cta="whatsapp"
              variant="light"
              size="sm"
              className="w-fit"
              leadingIcon={<MessageCircle aria-hidden className="size-4" />}
            >
              Agendar avaliação
            </Button>
          </li>
        </ul>
      </div>
    </section>
  );
}
