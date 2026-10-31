"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
/** No servidor assume movimento permitido; o cliente corrige após a hidratação. */
const getServerSnapshot = () => false;

/**
 * `true` quando o visitante prefere movimento reduzido (atualiza ao vivo).
 * Observação: no primeiro render de hidratação retorna `false`. Para animações de
 * entrada que rodam no mount, prefira `gsap.matchMedia()` dentro do `useGSAP`.
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
