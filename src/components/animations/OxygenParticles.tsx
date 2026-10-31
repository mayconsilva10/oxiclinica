import { cn } from "@/lib/utils";

/**
 * Partículas de oxigênio: poucas, leves, CSS puro (somente transform/opacity).
 * Posições fixas (determinísticas) para não haver divergência SSR/cliente.
 * Com prefers-reduced-motion a animação é desativada (motion-reduce:animate-none).
 */
type Particle = {
  top: string;
  left: string;
  size: number; // px
  delay: number; // s
  duration: number; // s
  ring?: boolean; // contorno (molécula) em vez de ponto
};

const PARTICLES: readonly Particle[] = [
  { top: "14%", left: "8%", size: 6, delay: 0, duration: 11 },
  { top: "28%", left: "88%", size: 10, delay: 1.5, duration: 13, ring: true },
  { top: "62%", left: "4%", size: 8, delay: 3, duration: 12, ring: true },
  { top: "78%", left: "46%", size: 5, delay: 0.8, duration: 10 },
  { top: "40%", left: "52%", size: 4, delay: 2.2, duration: 14 },
  { top: "86%", left: "92%", size: 7, delay: 4, duration: 12 },
  { top: "8%", left: "64%", size: 9, delay: 2.8, duration: 15, ring: true },
  { top: "52%", left: "74%", size: 5, delay: 5, duration: 11 },
];

export function OxygenParticles({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={cn(
            "absolute block rounded-full opacity-0 will-change-transform motion-safe:animate-oxygen-float motion-reduce:opacity-40",
            p.ring ? "border border-brand-tech/70" : "bg-brand-tech/70",
          )}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
