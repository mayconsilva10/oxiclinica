import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  // Abaixo de sm o texto pode quebrar (evita overflow horizontal em telas de 320 px); min-h mantém a altura.
  "group inline-flex max-w-full items-center justify-center gap-2 rounded-full text-center font-display font-semibold sm:whitespace-nowrap [&>svg]:shrink-0 " +
  "transition-[background-color,color,border-color,box-shadow,translate] duration-300 ease-out-soft " +
  "motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 hover:shadow-md " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  /** Ação principal sobre fundo claro. */
  primary: "bg-brand-strong text-white shadow-soft hover:bg-brand-deep focus-visible:outline-brand",
  /** Ação secundária sobre fundo claro. */
  secondary:
    "border border-brand/40 bg-white text-brand-deep hover:border-brand hover:bg-brand-soft focus-visible:outline-brand",
  /** Ação discreta, sem fundo. */
  ghost: "text-brand-deep hover:bg-brand-soft focus-visible:outline-brand",
  /** Ação principal sobre fundo verde profundo. */
  light: "bg-white text-brand-deep shadow-soft hover:bg-brand-soft focus-visible:outline-white",
  /** Ação secundária sobre fundo verde profundo. */
  "outline-light":
    "border border-white/40 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-2.5 text-[0.9375rem]",
  lg: "min-h-14 px-8 py-3 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Ícone (ex.: lucide-react) exibido após o texto. */
  icon?: ReactNode;
  /** Ícone exibido antes do texto. */
  leadingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & { href: string };
type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

export type ButtonProps = AnchorProps | NativeButtonProps;

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

/**
 * Botão do design system. Com `href` renderiza <a> (âncoras, tel:, WhatsApp);
 * sem `href` renderiza <button>. Links externos (http) abrem em nova aba automaticamente
 * (target/rel) e recebem o aviso "(abre em nova aba)" para leitores de tela — exceto quando
 * um `aria-label` é informado (nesse caso, inclua o aviso no próprio label).
 */
export function Button(props: ButtonProps) {
  const { variant, size, icon, leadingIcon, className, children, ...rest } = props;
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {leadingIcon}
      <span>{children}</span>
      {icon && (
        <span className="transition-[translate] duration-300 ease-out-soft motion-safe:group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (typeof rest.href === "string") {
    const anchorProps = rest as ComponentPropsWithoutRef<"a">;
    const isExternal = /^https?:\/\//.test(rest.href);
    return (
      <a
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorProps}
        className={classes}
      >
        {content}
        {isExternal && !anchorProps["aria-label"] && <span className="sr-only"> (abre em nova aba)</span>}
      </a>
    );
  }

  const buttonProps = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
