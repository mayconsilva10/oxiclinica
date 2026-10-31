import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "soft" | "glass" | "dark";

const variants: Record<Variant, string> = {
  /** Branco com borda sutil — padrão sobre fundo branco ou verde suave. */
  default: "border border-line bg-white shadow-soft",
  /** Verde suave — para destacar sobre fundo branco. */
  soft: "border border-brand/10 bg-brand-soft",
  /** Transparência moderada — sobre fotos ou gradientes. */
  glass: "border border-white/60 bg-white/70 shadow-soft backdrop-blur-md",
  /** Para seções em verde profundo. */
  dark: "border border-white/10 bg-white/5 text-white backdrop-blur-sm",
};

type CardProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  /** Eleva levemente no hover (para cards clicáveis ou de destaque). */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Card<T extends ElementType = "div">({
  as,
  variant = "default",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn(
        "rounded-card p-6 sm:p-8",
        variants[variant],
        interactive &&
          "transition-[translate,box-shadow,border-color] duration-300 ease-out-soft motion-safe:hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg focus-within:border-brand/40 focus-within:shadow-lg",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
