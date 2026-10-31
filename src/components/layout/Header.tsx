"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, WHATSAPP } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 24;

/**
 * Header fixo: transparente sobre o Hero (fundo verde profundo) e claro após rolar.
 * Inclui navegação por âncoras, destaque da seção ativa e menu mobile acessível.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(NAV_LINKS[0].id);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Estado "rolado"
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Seção ativa (aria-current) via IntersectionObserver
  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback((returnFocus = false) => {
    setMenuOpen(false);
    if (returnFocus) menuButtonRef.current?.focus();
  }, []);

  // Menu mobile: Esc fecha, trava rolagem do body, foco no primeiro link,
  // fecha ao passar para o breakpoint desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && closeMenu();
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen, closeMenu]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-soft",
        solid ? "bg-white/90 shadow-header backdrop-blur-lg" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-site flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-soft",
          scrolled ? "h-16" : "h-header",
        )}
      >
        <a
          href="/#inicio"
          className="relative shrink-0 rounded-md"
          aria-label="Oxiclínica — voltar ao início"
          onClick={() => closeMenu()}
        >
          {/* Duas versões sobrepostas para trocar sem piscar */}
          <Logo
            variant="white"
            priority
            className={cn(
              "h-10 transition-opacity duration-500 sm:h-11",
              solid ? "opacity-0" : "opacity-100",
            )}
          />
          <Logo
            variant="color"
            priority
            className={cn(
              "absolute inset-0 h-10 transition-opacity duration-500 sm:h-11",
              solid ? "opacity-100" : "opacity-0",
            )}
          />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map(({ id, label }) => {
              const active = activeId === id;
              return (
                <li key={id}>
                  <a
                    href={`/#${id}`}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-300",
                      solid
                        ? active
                          ? "text-brand-deep"
                          : "text-ink-muted hover:text-brand-deep"
                        : active
                          ? "text-white"
                          : "text-white/75 hover:text-white",
                    )}
                  >
                    {label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300 ease-out-soft",
                        solid ? "bg-brand" : "bg-brand-tech",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={WHATSAPP.url}
            size="sm"
            variant={solid ? "primary" : "light"}
            leadingIcon={<MessageCircle aria-hidden className="size-4" />}
            className="hidden sm:inline-flex"
            aria-label="Fale com nossa equipe pelo WhatsApp (abre em nova aba)"
          >
            Fale conosco
          </Button>

          <button
            ref={menuButtonRef}
            type="button"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
              solid ? "text-brand-deep hover:bg-brand-soft" : "text-white hover:bg-white/10",
            )}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!menuOpen}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Navegação mobile" className="container-site flex flex-col gap-8 py-8">
          <ul className="flex flex-col">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id} className="border-b border-line/70">
                <a
                  href={`/#${id}`}
                  aria-current={activeId === id ? "location" : undefined}
                  onClick={() => closeMenu()}
                  className={cn(
                    "flex items-center justify-between py-4 font-display text-xl font-semibold",
                    activeId === id ? "text-brand" : "text-ink",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            href={WHATSAPP.url}
            size="lg"
            leadingIcon={<MessageCircle aria-hidden className="size-5" />}
            onClick={() => closeMenu()}
          >
            Fale com nossa equipe
          </Button>
        </nav>
      </div>
    </header>
  );
}
