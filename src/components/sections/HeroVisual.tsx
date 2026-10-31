import Image from "next/image";
import { ChamberIllustration } from "@/components/sections/ChamberIllustration";
import { OxygenParticles } from "@/components/animations/OxygenParticles";
import { cn } from "@/lib/utils";

export type HeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Visual do Hero. Sem `image`, mostra a ilustração técnica provisória;
 * com `image`, mostra a fotografia real via next/image (preload + fetchPriority alto, pois é o LCP).
 */
export function HeroVisual({ image, className }: { image?: HeroImage | null; className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      {/* Círculos de "pressão" com rotação lenta */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute aspect-square w-[112%] rounded-full border border-dashed border-white/10 motion-safe:animate-spin-slow" />
        <div className="absolute aspect-square w-[88%] rounded-full border border-brand-tech/20 motion-safe:animate-spin-slower">
          <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-tech/80" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-media border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.45)]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            preload
            fetchPriority="high"
            sizes="(min-width: 1024px) 34rem, 92vw"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="hero-blueprint relative px-4 py-8 sm:px-8 sm:py-10">
            <OxygenParticles />
            <ChamberIllustration className="relative" />
          </div>
        )}
      </div>

      {!image && (
        <figcaption className="relative mt-3 text-center text-xs text-white/70">
          Ilustração representativa
        </figcaption>
      )}
    </figure>
  );
}
