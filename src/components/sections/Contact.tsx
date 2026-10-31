import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADDRESS, MAPS, OPENING_HOURS, PHONES, WHATSAPP } from "@/lib/constants";
import { cn } from "@/lib/utils";

function InfoTitle({ icon: Icon, children }: { icon: typeof MapPin; children: string }) {
  return (
    <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-strong">
      <Icon aria-hidden className="size-4" />
      {children}
    </h3>
  );
}

/** Contato e localização (#contato). Server Component. */
export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="bg-brand-soft py-section lg:py-section-lg"
      data-reveal-section
    >
      <div className="container-site">
        <SectionHeading
          reveal
          id="contato-titulo"
          eyebrow="Contato"
          title="Fale com a nossa equipe"
          description="Tire suas dúvidas, consulte a cobertura do seu plano ou agende uma avaliação."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8" data-reveal-group>
          <div className="flex flex-col gap-8 rounded-card border border-line bg-white p-6 shadow-soft sm:p-8" data-reveal-item>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="flex flex-col gap-3">
                <InfoTitle icon={MapPin}>Endereço</InfoTitle>
                <address className="not-italic leading-relaxed text-ink">
                  {ADDRESS.street} — {ADDRESS.district}
                  <br />
                  {ADDRESS.city} — {ADDRESS.state}
                  <br />
                  CEP {ADDRESS.zip}
                </address>
              </div>

              <div className="flex flex-col gap-3">
                <InfoTitle icon={Phone}>Telefones</InfoTitle>
                <ul className="flex flex-col gap-2">
                  {PHONES.map((phone) => (
                    <li key={phone.href}>
                      <a
                        href={phone.href}
                        data-cta="phone"
                        className="font-display text-lg font-semibold text-ink underline-offset-4 transition-colors hover:text-brand-strong hover:underline"
                      >
                        {phone.display}
                      </a>
                      <span className="block text-sm text-ink-muted">{phone.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <InfoTitle icon={Clock}>Horários de atendimento</InfoTitle>
              <table className="w-full text-left text-[0.9375rem]">
                <caption className="sr-only">Horários de atendimento da Oxiclínica</caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Dia</th>
                    <th scope="col">Horário</th>
                  </tr>
                </thead>
                <tbody>
                  {OPENING_HOURS.map((item) => (
                    <tr key={item.days} className="border-b border-line last:border-b-0">
                      <th scope="row" className="py-2.5 pr-4 font-medium text-ink">
                        {item.days}
                      </th>
                      <td
                        className={cn(
                          "py-2.5 text-right tabular-nums",
                          item.closed ? "text-ink-muted" : "font-semibold text-ink",
                        )}
                      >
                        {item.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-auto flex flex-wrap gap-3">
              <Button
                href={WHATSAPP.url}
                data-cta="whatsapp"
                leadingIcon={<MessageCircle aria-hidden className="size-4" />}
              >
                Conversar no WhatsApp
              </Button>
              <Button
                href={MAPS.directionsUrl}
                data-cta="route"
                variant="secondary"
                leadingIcon={<Navigation aria-hidden className="size-4" />}
              >
                Abrir rota
                <span className="sr-only"> no Google Maps</span>
              </Button>
            </div>
          </div>

          {/* Mapa: altura fixa para evitar CLS */}
          <div className="h-[22rem] overflow-hidden rounded-card border border-line bg-white shadow-soft sm:h-[26rem] lg:h-auto lg:min-h-[32rem]" data-reveal-item>
            <iframe
              src={MAPS.embedUrl}
              title={`Mapa com a localização da Oxiclínica: ${ADDRESS.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
