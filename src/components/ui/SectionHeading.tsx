import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Texto curto acima do título (ex.: "Tratamento"). */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** "dark" para uso sobre fundos verde profundo. */
  tone?: "light" | "dark";
  /** Nível do título; h2 por padrão. */
  as?: "h1" | "h2" | "h3";
  /** id do título, útil para aria-labelledby na <section>. */
  id?: string;
  className?: string;
  /** Marca o bloco com `data-reveal` (fade-up na rolagem — Etapa 4). */
  reveal?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  id,
  className,
  reveal = false,
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  return (
    <div
      data-reveal={reveal ? "" : undefined}
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.18em]",
            isDark ? "text-brand-mint" : "text-brand-strong",
          )}
        >
          <span aria-hidden className="h-px w-6 bg-current" />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "text-balance font-display text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem]",
          isDark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "text-pretty text-base leading-relaxed sm:text-lg",
            isDark ? "text-white/75" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
