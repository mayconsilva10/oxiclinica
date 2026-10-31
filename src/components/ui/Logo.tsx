import Image from "next/image";
import { cn } from "@/lib/utils";

/*
 * Logomarca extraída de images_.jpg (fundo removido, 347×141 px).
 * Provisória até a clínica enviar o arquivo original em SVG/PNG de alta resolução
 * (planejamento, seção 9). Basta substituir os PNGs em public/images/.
 */
const SOURCES = {
  color: "/images/logo-oxiclinica.png",
  white: "/images/logo-oxiclinica-white.png",
} as const;

type LogoProps = {
  /** "white" para fundos verde profundo; "color" para fundos claros. */
  variant?: keyof typeof SOURCES;
  className?: string;
  /** Carrega sem lazy-load (logo acima da dobra). Sem preload: a logo não é o LCP. */
  eager?: boolean;
};

export function Logo({ variant = "color", className, eager }: LogoProps) {
  return (
    <Image
      src={SOURCES[variant]}
      alt="Oxiclínica — Centro Médico Hiperbárico do Oeste Paulista"
      width={347}
      height={141}
      loading={eager ? "eager" : "lazy"}
      sizes="160px"
      className={cn("h-11 w-auto", className)}
    />
  );
}
