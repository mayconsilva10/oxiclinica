import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/lib/constants";

/**
 * Botão flutuante de WhatsApp (fixo no canto inferior direito, todas as páginas).
 * Respeita a safe-area (iOS). O rodapé reserva espaço inferior para que ele não cubra conteúdo.
 */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      aria-label="Conversar com a Oxiclínica pelo WhatsApp (abre em nova aba)"
      className="group fixed bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 inline-flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_30px_-8px_rgb(22_74_61/0.6)] ring-4 ring-white/70 transition-[background-color,translate] duration-300 ease-out-soft motion-safe:hover:-translate-y-0.5 hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:bottom-[max(1.5rem,calc(env(safe-area-inset-bottom)+0.75rem))] sm:right-[max(1.5rem,env(safe-area-inset-right))]"
    >
      <MessageCircle aria-hidden className="size-6 transition-[scale] duration-300 motion-safe:group-hover:scale-110" />
    </a>
  );
}
