/**
 * Configuração central do GSAP (único lugar onde plugins são registrados).
 * Importe `gsap`/`ScrollTrigger` daqui nos componentes de animação.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/** Media queries usadas com gsap.matchMedia (o matchMedia reverte tudo ao deixar de casar). */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 1024px)"; // breakpoint `lg` do Tailwind
export const MOBILE = "(max-width: 1023.98px)";

/** Presets (planejamento 4.3: 500–800 ms, power2/power3.out, deslocamentos pequenos). */
export const EASE = {
  out: "power3.out",
  soft: "power2.out",
} as const;

export const DURATION = {
  fast: 0.5,
  base: 0.7,
  slow: 0.8,
} as const;

export const REVEAL = {
  /** Deslocamento vertical do fade-up (px). */
  y: 28,
  /** Escala inicial de [data-reveal="scale"]. */
  scale: 0.96,
  /** Intervalo entre itens de [data-reveal-group]. */
  stagger: 0.08,
  /** Posição da viewport em que a entrada dispara. */
  start: "top 88%",
} as const;

export const PARALLAX = {
  /** Escala da imagem para que o deslocamento não revele bordas do frame. */
  scale: 1.1,
  /** Deslocamento máximo (yPercent) em cada sentido. */
  yPercent: 4,
} as const;

/**
 * Elemento já visível (ou acima) da viewport no momento da montagem — não é ocultado,
 * para não piscar (ex.: carregamento direto em /#contato ou scroll restaurado).
 */
export function isAlreadySeen(el: Element, threshold = 0.92) {
  return el.getBoundingClientRect().top < window.innerHeight * threshold;
}

export { gsap, ScrollTrigger, useGSAP };
