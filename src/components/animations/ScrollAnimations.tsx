"use client";

import {
  DESKTOP,
  DURATION,
  EASE,
  MOBILE,
  MOTION_OK,
  PARALLAX,
  REVEAL,
  ScrollTrigger,
  gsap,
  isAlreadySeen,
  useGSAP,
} from "@/lib/animations";

const q = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(selector));

/**
 * Animações de rolagem da landing page, dirigidas por data-attributes (montado uma vez em page.tsx).
 *
 * - `[data-reveal]` → fade-up; `[data-reveal="scale"]` → fade + scale.
 * - `[data-reveal-group]` → stagger dos `[data-reveal-item]` (ScrollTrigger.batch).
 * - `[data-chamber-callouts]` → marcadores da ilustração entram em sequência.
 * - `[data-parallax-frame] [data-parallax]` → parallax discreto (scrub, só transform).
 * - `[data-timeline]` → `[data-timeline-progress]` preenche com scaleX (lg) / scaleY (mobile);
 *   etapas atingidas recebem `data-reached` (estilo em globals.css).
 *
 * Anti-flash / fallback: nada é ocultado por CSS. O estado inicial é aplicado pelo GSAP (em
 * requestIdleCallback, após o carregamento) e somente para elementos ainda abaixo da dobra; os que já
 * estão visíveis ficam como vieram do SSR. Sem JS ou com prefers-reduced-motion: tudo visível
 * e estático (a linha do tempo fica cheia). O matchMedia reverte tudo no unmount.
 * O Hero não é tocado (HeroMotion cuida dele).
 */
export function ScrollAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    let cancelled = false;

    // Tudo aqui afeta só conteúdo abaixo da dobra: a configuração roda quando o navegador fica
    // ocioso (após a hidratação/LCP), para não competir com o carregamento inicial.
    const setup = () => {
      if (cancelled) return;

      // Entradas (uma vez por elemento)
      mm.add(MOTION_OK, () => {
        const revealEls = q("[data-reveal]");
        const groups = q("[data-reveal-group]").map((group) => q("[data-reveal-item]", group));
        const calloutWraps = q("[data-chamber-callouts]");
        // Todas as leituras de layout em lote, antes de qualquer escrita (evita layout thrashing)
        const seen = new Set(
          [...revealEls, ...groups.flat(), ...calloutWraps].filter((el) => isAlreadySeen(el)),
        );

        for (const el of revealEls) {
          if (seen.has(el)) continue;
          const isScale = el.dataset.reveal === "scale";
          gsap.from(el, {
            opacity: 0,
            y: isScale ? 0 : REVEAL.y,
            scale: isScale ? REVEAL.scale : 1,
            duration: isScale ? DURATION.slow : DURATION.base,
            ease: EASE.out,
            clearProps: "transform,opacity,visibility",
            scrollTrigger: { trigger: el, start: REVEAL.start, once: true },
          });
        }

        for (const group of groups) {
          const items = group.filter((el) => !seen.has(el));
          if (!items.length) continue;
          gsap.set(items, { opacity: 0, y: REVEAL.y * 0.8 });
          ScrollTrigger.batch(items, {
            start: REVEAL.start,
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: DURATION.base,
                ease: EASE.out,
                stagger: REVEAL.stagger,
                clearProps: "transform,opacity,visibility",
              }),
          });
        }

        for (const wrap of calloutWraps) {
          if (seen.has(wrap)) continue;
          gsap.from(q("[data-chamber-callout]", wrap), {
            opacity: 0,
            scale: 0.4,
            transformOrigin: "50% 50%",
            duration: DURATION.fast,
            ease: "back.out(1.6)",
            stagger: 0.1,
            delay: 0.35,
            clearProps: "transform,opacity,visibility",
            scrollTrigger: { trigger: wrap, start: REVEAL.start, once: true },
          });
        }

        // Parallax discreto (a imagem é ampliada para não expor as bordas do frame)
        for (const frame of q("[data-parallax-frame]")) {
          const media = q("[data-parallax]", frame);
          if (!media.length) continue;
          gsap.fromTo(
            media,
            { scale: PARALLAX.scale, yPercent: -PARALLAX.yPercent },
            {
              scale: PARALLAX.scale,
              yPercent: PARALLAX.yPercent,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });

      // Linha do tempo (o tipo de trilha depende do breakpoint)
      const timeline = (orientation: "horizontal" | "vertical") => {
        const reached: HTMLElement[] = [];
        for (const root of q("[data-timeline]")) {
          const track = root.querySelector<HTMLElement>(`[data-timeline-track="${orientation}"]`);
          const fill = track?.querySelector<HTMLElement>("[data-timeline-progress]");
          if (!track || !fill) continue;
          const steps = q("[data-timeline-step]", root);
          reached.push(...steps);
          const axis = orientation === "horizontal" ? "scaleX" : "scaleY";
          let thresholds: number[] = [];

          const measure = () => {
            const t = track.getBoundingClientRect();
            thresholds = steps.map((step) => {
              const m = (step.querySelector("[data-timeline-marker]") ?? step).getBoundingClientRect();
              const ratio =
                orientation === "horizontal"
                  ? (m.left + m.width / 2 - t.left) / t.width
                  : (m.top + m.height / 2 - t.top) / t.height;
              return gsap.utils.clamp(0, 1, ratio);
            });
          };

          const mark = (progress: number) => {
            steps.forEach((step, i) => {
              step.toggleAttribute("data-reached", progress >= (thresholds[i] ?? 1) - 0.02);
            });
          };

          measure();
          gsap.fromTo(
            fill,
            { [axis]: 0 },
            {
              [axis]: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: orientation === "horizontal" ? "top 75%" : "top 70%",
                end: orientation === "horizontal" ? "bottom 55%" : "bottom 60%",
                scrub: 0.6,
                onRefresh: measure,
              },
              onUpdate() {
                mark(this.progress());
              },
            },
          );

        }
        return () => reached.forEach((step) => step.removeAttribute("data-reached"));
      };

      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => timeline("horizontal"));
      mm.add(`${MOTION_OK} and ${MOBILE}`, () => timeline("vertical"));

      // Fontes (swap) e imagens podem alterar a altura das seções → recalcula os gatilhos.
      document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    };

    const idle = typeof window.requestIdleCallback === "function";
    const handle = idle
      ? window.requestIdleCallback(setup, { timeout: 1500 })
      : window.setTimeout(setup, 300);

    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      mm.revert();
    };
  });

  return null;
}
