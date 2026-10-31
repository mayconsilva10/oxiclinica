"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/animations";

/** Classe adicionada em <html> pelo script inline do layout (antes do 1º paint). */
export const HERO_PENDING_CLASS = "hero-pending";

/**
 * Animação de entrada do Hero (uma vez, ~1,2 s no total).
 * Alvos marcados com data-hero="eyebrow|title|description|actions|meta|visual".
 *
 * Sem flash/CLS: o HTML do SSR é visível por padrão. O script inline do layout adiciona
 * `hero-pending` em <html> (só se houver JS e movimento permitido), o CSS oculta os alvos
 * apenas nesse estado, e aqui a classe é removida e o `gsap.from` assume o estado inicial.
 * Só transform/opacity. Com prefers-reduced-motion nada é animado.
 */
export function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Libera o CSS antes de criar os tweens: o gsap.from lê o valor final do estilo
      // computado e aplica o inicial inline no mesmo frame (layout effect, sem paint no meio).
      document.documentElement.classList.remove(HERO_PENDING_CLASS);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(scope);
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.7 } });

        tl.from(q('[data-hero="visual"]'), { opacity: 0, scale: 0.94, duration: 0.8 }, 0)
          .from(q('[data-hero="eyebrow"]'), { opacity: 0, y: 16, duration: 0.5 }, 0)
          .from(q('[data-hero="title"]'), { opacity: 0, y: 28, stagger: 0.12 }, 0.08)
          .from(q('[data-hero="actions"]'), { opacity: 0, y: 20, stagger: 0.08, duration: 0.5, ease: "power2.out" }, 0.45)
          .from(q('[data-hero="meta"]'), { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" }, 0.6);
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
