import type { ReactNode } from "react";
import { Clock, Instagram, MapPin, Phone, Stethoscope } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import {
  ADDRESS,
  MAPS,
  NAV_LINKS,
  OPENING_HOURS,
  PHONES,
  SITE,
  SOCIAL,
  TECHNICAL_RESPONSIBLE,
} from "@/lib/constants";
import { CopyrightYear } from "./CopyrightYear";

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-brand-tech">
      {children}
    </h2>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-deep text-white/80">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:py-20">
        {/* Marca */}
        <div className="flex flex-col gap-5">
          <Logo variant="white" className="h-14 sm:h-16" />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {SITE.treatment} com acompanhamento médico em Presidente Prudente e região.
          </p>
          <a
            href={SOCIAL.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10"
          >
            <Instagram aria-hidden className="size-4" />
            {SOCIAL.instagram.handle}
            <span className="sr-only">(Instagram, abre em nova aba)</span>
          </a>
        </div>

        {/* Endereço e contato */}
        <div className="flex flex-col gap-4">
          <ColumnTitle>Contato</ColumnTitle>
          <address className="flex flex-col gap-4 text-sm not-italic leading-relaxed">
            <a
              href={MAPS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 transition-colors hover:text-white"
            >
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-tech" />
              <span>
                {ADDRESS.street} — {ADDRESS.district}
                <br />
                {ADDRESS.city}/{ADDRESS.state} — CEP {ADDRESS.zip}
                <span className="sr-only"> (abrir rota no mapa, nova aba)</span>
              </span>
            </a>
            <ul className="flex flex-col gap-2">
              {PHONES.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className="flex gap-3 transition-colors hover:text-white">
                    <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-tech" />
                    <span>
                      {phone.display}
                      <span className="sr-only"> — {phone.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        {/* Horários */}
        <div className="flex flex-col gap-4">
          <ColumnTitle>Horários</ColumnTitle>
          <ul className="flex flex-col gap-2 text-sm">
            {OPENING_HOURS.map((item) => (
              <li key={item.days} className="flex gap-3">
                <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-tech" />
                <span>
                  <span className="block text-white">{item.days}</span>
                  <span className={item.closed ? "text-white/50" : undefined}>{item.hours}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navegação e responsável técnico */}
        <div className="flex flex-col gap-4">
          <ColumnTitle>Navegação</ColumnTitle>
          <ul className="flex flex-col gap-2 text-sm">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a href={`/#${id}`} className="transition-colors hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-3 rounded-card border border-white/10 bg-white/5 p-4 text-sm">
            <Stethoscope aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-tech" />
            <p>
              <span className="block text-white/60">{TECHNICAL_RESPONSIBLE.role}</span>
              <span className="block font-medium text-white">{TECHNICAL_RESPONSIBLE.name}</span>
              <span>{TECHNICAL_RESPONSIBLE.crm}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {SITE.shortName} — {SITE.legalName} Todos os direitos reservados.
          </p>
          <a href="/privacidade" className="underline-offset-4 transition-colors hover:text-white hover:underline">
            Política de privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
