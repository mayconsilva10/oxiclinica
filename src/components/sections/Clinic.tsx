import Image from "next/image";
import { BadgeCheck, Building2, MapPin, MessageCircle, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADDRESS, INSURANCE, SITE, TECHNICAL_RESPONSIBLE, WHATSAPP } from "@/lib/constants";

/*
 * Apenas informações confirmadas (planejamento 3.6 e 8). Não incluir equipe, equipamentos,
 * certificações ou tempo de atuação sem confirmação da clínica.
 */
const FACTS = [
  { icon: Building2, label: "Instituição", value: SITE.legalName },
  { icon: MapPin, label: "Localização", value: `${ADDRESS.district}, ${ADDRESS.city}/${ADDRESS.state}` },
  { icon: BadgeCheck, label: "Convênio", value: `Credenciada à ${INSURANCE.name}` },
] as const;

/** Seção "Conheça a clínica" (#clinica). Server Component. */
export function Clinic() {
  return (
    <section
      id="clinica"
      aria-labelledby="clinica-titulo"
      className="bg-brand-soft py-section lg:py-section-lg"
      data-reveal-section
    >
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <SectionHeading
            reveal
            id="clinica-titulo"
            eyebrow="A clínica"
            title="Conheça a Oxiclínica"
            description={
              <>
                A Oxiclínica é o <strong className="font-semibold text-ink">{SITE.tagline}</strong>,
                em Presidente Prudente. Nosso foco é a oxigenoterapia hiperbárica, oferecida com
                indicação e acompanhamento médico para pacientes da cidade e da região.
              </>
            }
          />

          <ul className="grid gap-3" data-reveal-group>
            {FACTS.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-4 rounded-card bg-white p-4 shadow-soft" data-reveal-item>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <span className="text-sm">
                  <span className="block text-ink-muted">{label}</span>
                  <span className="block font-semibold text-ink">{value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Responsável técnico */}
        <article
          aria-labelledby="responsavel-tecnico-titulo"
          className="mt-14 grid gap-8 rounded-card border border-line bg-white p-4 shadow-soft sm:p-6 lg:grid-cols-5 lg:items-center lg:gap-12 lg:p-8"
          data-reveal="scale"
        >
          <div className="overflow-hidden rounded-media lg:col-span-2" data-parallax-frame>
            <Image
              src="/images/clinic/dr-aroldo-camara-hiperbarica.webp"
              alt={`${TECHNICAL_RESPONSIBLE.name}, responsável técnico da Oxiclínica, em frente à câmara hiperbárica`}
              width={960}
              height={1200}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] h-auto w-full object-cover object-[center_20%]"
              data-parallax
            />
          </div>

          <div className="flex flex-col gap-6 px-2 pb-4 sm:px-2 lg:col-span-3 lg:px-0 lg:pb-0">
            <p className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-strong">
              <Stethoscope aria-hidden className="size-4" />
              {TECHNICAL_RESPONSIBLE.role}
            </p>
            <div>
              <h3 id="responsavel-tecnico-titulo" className="text-3xl font-bold sm:text-4xl">
                {TECHNICAL_RESPONSIBLE.name}
              </h3>
              <p className="mt-3 inline-flex rounded-full bg-brand-soft px-3 py-1 font-display text-sm font-semibold text-brand-deep">
                {TECHNICAL_RESPONSIBLE.crm}
              </p>
            </div>
            {/* PENDENTE validação do Dr. Aroldo: texto de apresentação (substituir pela versão aprovada pelo médico). */}
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
              O {TECHNICAL_RESPONSIBLE.name} é o responsável técnico da Oxiclínica e acompanha a
              condução dos tratamentos de oxigenoterapia hiperbárica realizados na clínica, desde a
              avaliação da indicação até o acompanhamento de cada paciente.
            </p>

            {/* Imagem secundária, discreta + CTA da seção */}
            <div className="flex items-center gap-4 border-t border-line pt-6">
              <Image
                src="/images/clinic/dr-aroldo-retrato.webp"
                alt={`${TECHNICAL_RESPONSIBLE.name}, responsável técnico da Oxiclínica`}
                width={960}
                height={1200}
                sizes="64px"
                className="size-16 shrink-0 rounded-full object-cover object-[center_20%] ring-2 ring-white shadow-soft"
              />
              <p className="text-sm leading-relaxed text-ink-muted">
                Ficou com alguma dúvida sobre o tratamento? Nossa equipe pode orientar sobre a
                avaliação médica e o agendamento.
              </p>
            </div>
            <Button
              href={WHATSAPP.url}
              data-cta="whatsapp"
              className="w-fit"
              leadingIcon={<MessageCircle aria-hidden className="size-4" />}
            >
              Fale com nossa equipe
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
