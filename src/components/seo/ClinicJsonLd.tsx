import {
  ADDRESS,
  OPENING_HOURS,
  PHONES,
  SITE,
  SITE_URL,
  SOCIAL,
  TECHNICAL_RESPONSIBLE,
} from "@/lib/constants";

/**
 * Dados estruturados (schema.org/MedicalClinic) da home.
 * Somente informações confirmadas (planejamento, seção 8): sem avaliações, preços,
 * certificações nem coordenadas geográficas (geo omitido até haver dado confiável).
 */
export function ClinicJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/#clinica`,
    name: SITE.name,
    alternateName: SITE.shortName,
    legalName: SITE.legalName,
    description: SITE.description,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/logo-oxiclinica.png`,
    image: `${SITE_URL}/opengraph-image.png`,
    telephone: PHONES.map((p) => p.href.replace("tel:", "")),
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.zip,
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: `${ADDRESS.city}/${ADDRESS.state}` },
    openingHoursSpecification: OPENING_HOURS.flatMap((item) =>
      item.schema
        ? [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: item.schema.dayOfWeek.map((d) => `https://schema.org/${d}`),
              opens: item.schema.opens,
              closes: item.schema.closes,
            },
          ]
        : [],
    ),
    availableService: {
      "@type": "MedicalTherapy",
      name: SITE.treatment,
    },
    employee: {
      "@type": "Physician",
      name: TECHNICAL_RESPONSIBLE.name,
      description: `${TECHNICAL_RESPONSIBLE.role} — ${TECHNICAL_RESPONSIBLE.crm}`,
    },
    sameAs: [SOCIAL.instagram.url],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
    />
  );
}
