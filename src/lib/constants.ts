/**
 * Dados institucionais — fonte única (planejamento, seção 8).
 * Itens marcados como "confirmar" na seção 9 devem ser validados antes da publicação.
 */

export const SITE = {
  name: "Oxiclínica Presidente Prudente",
  shortName: "Oxiclínica",
  legalName: "Centro Médico Hiperbárico do Oeste Paulista Ltda.",
  tagline: "Centro Médico Hiperbárico do Oeste Paulista",
  treatment: "Oxigenoterapia hiperbárica",
} as const;

export const TECHNICAL_RESPONSIBLE = {
  name: "Dr. Aroldo Ferreira da Silva",
  role: "Responsável técnico",
  crm: "CRM/SP 31908",
} as const;

export const ADDRESS = {
  street: "Av. Marechal Deodoro, 205",
  district: "Vila São Jorge",
  city: "Presidente Prudente",
  state: "SP",
  zip: "19013-060",
  /** Endereço em uma linha, útil para mapas e metadados. */
  full: "Av. Marechal Deodoro, 205 — Vila São Jorge, Presidente Prudente/SP — CEP 19013-060",
} as const;

const mapsQuery = encodeURIComponent(
  "Av. Marechal Deodoro, 205, Vila São Jorge, Presidente Prudente - SP, 19013-060",
);

export const MAPS = {
  /** Abre a rota no Google Maps. */
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  /** URL para iframe incorporado (sem chave de API). */
  embedUrl: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
} as const;

export type Phone = { label: string; display: string; href: string };

export const PHONES: readonly Phone[] = [
  { label: "Telefone fixo", display: "(18) 3908-2113", href: "tel:+551839082113" },
  { label: "Celular / WhatsApp", display: "(18) 99751-4254", href: "tel:+5518997514254" },
] as const;

const WHATSAPP_NUMBER = "5518997514254";
const WHATSAPP_MESSAGE = "Olá! Gostaria de obter informações sobre a oxigenoterapia hiperbárica.";

export const WHATSAPP = {
  number: WHATSAPP_NUMBER,
  message: WHATSAPP_MESSAGE,
  /** Link wa.me com mensagem pré-preenchida (url-encoded). */
  url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
} as const;

export type OpeningHour = { days: string; hours: string; closed?: boolean };

export const OPENING_HOURS: readonly OpeningHour[] = [
  { days: "Segunda a quinta-feira", hours: "07:30 às 18:00" },
  { days: "Sexta-feira", hours: "07:00 às 18:00" },
  { days: "Sábado", hours: "08:00 às 11:00" },
  { days: "Domingo", hours: "Fechado", closed: true },
] as const;

export const SOCIAL = {
  instagram: { handle: "@oxiclinica", url: "https://www.instagram.com/oxiclinica/" },
} as const;

export const INSURANCE = {
  name: "Unimed Presidente Prudente",
  url: "https://unimedprudente.com.br/guia-medico/rede-credenciada/437/oxiclinica",
} as const;

export const SESSION_DURATION = "90 a 120 minutos";

/** Links âncora do header. Os ids correspondem às <section> em page.tsx. */
export const NAV_LINKS = [
  { id: "inicio", label: "Início" },
  { id: "tratamento", label: "Tratamento" },
  { id: "indicacoes", label: "Indicações" },
  { id: "clinica", label: "Clínica" },
  { id: "contato", label: "Contato" },
] as const;
