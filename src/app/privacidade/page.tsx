import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADDRESS, PHONES, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de privacidade",
  alternates: { canonical: "/privacidade" },
  robots: { index: false, follow: true },
};

/*
 * PROVISÓRIO: o texto definitivo da política de privacidade (LGPD) deve ser
 * redigido/validado pela clínica antes da publicação (planejamento, seção 10, item 6).
 */
export default function PrivacyPage() {
  return (
    <>
      <div className="bg-brand-deep pb-16 pt-[calc(var(--spacing-header)+3rem)]">
        <div className="container-site">
          <SectionHeading as="h1" tone="dark" eyebrow={SITE.shortName} title="Política de privacidade" />
        </div>
      </div>
      <div className="container-site py-section">
        <div className="flex max-w-3xl flex-col gap-4 leading-relaxed text-ink-muted">
          <p>
            Esta página está em elaboração. O texto completo da política de privacidade, em
            conformidade com a Lei Geral de Proteção de Dados (LGPD), será publicado em breve.
          </p>
          <p>
            Em caso de dúvidas sobre o tratamento de dados pessoais, entre em contato com a{" "}
            {SITE.legalName} pelos telefones {PHONES.map((p) => p.display).join(" ou ")}, ou
            presencialmente em {ADDRESS.full}.
          </p>
        </div>
      </div>
    </>
  );
}
