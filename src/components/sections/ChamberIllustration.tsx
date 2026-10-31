import { cn } from "@/lib/utils";

const TECH = "var(--color-brand-tech)";

/** Marcações do manômetro, pré-calculadas (determinísticas para SSR). */
const GAUGE_TICKS = Array.from({ length: 9 }, (_, i) => {
  const a = ((-210 + i * 30) * Math.PI) / 180;
  const r1 = 18;
  const r2 = i % 2 === 0 ? 13 : 15;
  return {
    x1: +(319 + r1 * Math.cos(a)).toFixed(2),
    y1: +(92 + r1 * Math.sin(a)).toFixed(2),
    x2: +(319 + r2 * Math.cos(a)).toFixed(2),
    y2: +(92 + r2 * Math.sin(a)).toFixed(2),
  };
});

/**
 * Ilustração técnica estilizada de uma câmara hiperbárica (SVG, traço de "blueprint").
 * Provisória — é substituída pela fotografia real via HERO_IMAGE em Hero.tsx.
 * Não representa um equipamento específico nem traz medidas/especificações.
 */
/**
 * Marcadores numerados dos componentes (usados na seção "Tratamento").
 * A ordem corresponde à legenda CHAMBER_PARTS em About.tsx.
 */
export const CHAMBER_CALLOUTS = [
  { x: 256, y: 250 }, // 1. Corpo pressurizado
  { x: 338, y: 176 }, // 2. Visores
  { x: 506, y: 136 }, // 3. Porta com vedação
  { x: 356, y: 62 }, // 4. Controle de pressão e oxigênio
  { x: 98, y: 226 }, // 5. Painel de comunicação
] as const;

type ChamberIllustrationProps = {
  className?: string;
  /** Prefixo dos ids internos do SVG (evita ids duplicados com mais de uma instância na página). */
  idPrefix?: string;
  /** Exibe os marcadores numerados dos componentes. */
  callouts?: boolean;
};

export function ChamberIllustration({
  className,
  idPrefix = "camara",
  callouts = false,
}: ChamberIllustrationProps) {
  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      role="img"
      aria-labelledby={`${idPrefix}-ilustracao-titulo`}
      className={cn("h-auto w-full", className)}
    >
      <title id={`${idPrefix}-ilustracao-titulo`}>Ilustração de uma câmara hiperbárica</title>
      <defs>
        <linearGradient id={`${idPrefix}-corpo`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id={`${idPrefix}-vidro`} cx="0.35" cy="0.35" r="0.8">
          <stop offset="0" stopColor={TECH} stopOpacity="0.55" />
          <stop offset="1" stopColor={TECH} stopOpacity="0.08" />
        </radialGradient>
        <linearGradient id={`${idPrefix}-tampa`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Sombra no piso */}
      <ellipse cx="280" cy="352" rx="230" ry="14" fill="#000" opacity="0.18" />

      {/* Suportes */}
      <g stroke={TECH} strokeOpacity="0.7" strokeWidth="1.5" fill="#ffffff" fillOpacity="0.04">
        <path d="M128 300 L112 348 H196 L180 300 Z" />
        <path d="M364 300 L348 348 H432 L416 300 Z" />
      </g>
      <path d="M60 348 H500" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* Tubulação e manômetro */}
      <g stroke={TECH} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8">
        <path d="M200 128 V92 H289" />
        <path d="M349 92 H400 V128" />
      </g>
      <circle cx="200" cy="92" r="3" fill={TECH} />
      <circle cx="319" cy="92" r="30" fill="#ffffff" fillOpacity="0.06" stroke={TECH} strokeWidth="1.5" />
      <circle cx="319" cy="92" r="22" stroke="#fff" strokeOpacity="0.25" />
      {GAUGE_TICKS.map((t, i) => (
        <line
          key={i}
          {...t}
          stroke="#fff"
          strokeOpacity="0.6"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      ))}
      <path d="M319 92 L331 80" stroke={TECH} strokeWidth="2" strokeLinecap="round" />
      <circle cx="319" cy="92" r="3" fill={TECH} />

      {/* Corpo cilíndrico */}
      <rect x="56" y="128" width="400" height="176" rx="88" fill={`url(#${idPrefix}-corpo)`} stroke={TECH} strokeWidth="2" />
      {/* Reflexos */}
      <path d="M120 146 H392" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
      <path d="M140 156 H300" stroke="#fff" strokeOpacity="0.15" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M120 286 H392" stroke="#000" strokeOpacity="0.12" strokeWidth="2" strokeLinecap="round" />

      {/* Anéis de reforço */}
      <g stroke="#fff" strokeOpacity="0.22" strokeWidth="1.5">
        <path d="M148 129 Q160 216 148 303" />
        <path d="M256 128 Q268 216 256 304" />
        <path d="M364 129 Q376 216 364 303" />
      </g>

      {/* Visores */}
      {[202, 310].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="206" r="24" fill="#ffffff" fillOpacity="0.06" stroke={TECH} strokeWidth="1.5" />
          <circle cx={cx} cy="206" r="16" fill={`url(#${idPrefix}-vidro)`} />
          <path
            d={`M${cx - 9} 200 A 11 11 0 0 1 ${cx - 1} 193`}
            stroke="#fff"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Painel lateral */}
      <rect x="100" y="238" width="44" height="30" rx="6" stroke="#fff" strokeOpacity="0.3" />
      <circle cx="112" cy="253" r="3" fill={TECH} />
      <path d="M122 249 H136 M122 257 H132" stroke="#fff" strokeOpacity="0.4" strokeLinecap="round" />

      {/* Tampa frontal (porta) */}
      <ellipse cx="456" cy="216" rx="52" ry="88" fill={`url(#${idPrefix}-tampa)`} stroke={TECH} strokeWidth="2" />
      <ellipse cx="456" cy="216" rx="38" ry="70" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* Volante de travamento */}
      <circle cx="456" cy="216" r="16" fill="#ffffff" fillOpacity="0.08" stroke={TECH} strokeWidth="2" />
      <path
        d="M456 192 V240 M436 216 H476 M442 202 L470 230 M470 202 L442 230"
        stroke={TECH}
        strokeOpacity="0.75"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="456" cy="216" r="4" fill={TECH} />
      {/* Dobradiças */}
      <g fill={TECH} opacity="0.8">
        <rect x="400" y="160" width="10" height="18" rx="3" />
        <rect x="400" y="254" width="10" height="18" rx="3" />
      </g>

      {/* Linhas de cota (estilo desenho técnico, sem medidas) */}
      <g stroke="#fff" strokeOpacity="0.28" strokeWidth="1">
        <path d="M56 382 H508" strokeDasharray="4 6" />
        <path d="M56 374 V390 M508 374 V390" />
        <path d="M534 128 V304" strokeDasharray="4 6" />
        <path d="M526 128 H542 M526 304 H542" />
      </g>

      {/* Moléculas de O₂ */}
      <g stroke={TECH} strokeWidth="1.5" fill={TECH} fillOpacity="0.15">
        <circle cx="84" cy="70" r="9" />
        <circle cx="98" cy="70" r="9" />
        <circle cx="470" cy="60" r="7" />
        <circle cx="481" cy="60" r="7" />
      </g>

      {/* Marcadores numerados (a legenda acessível fica no HTML) */}
      {callouts && (
        <g aria-hidden data-chamber-callouts>
          {CHAMBER_CALLOUTS.map(({ x, y }, i) => (
            <g key={i} data-chamber-callout={i + 1}>
              <circle cx={x} cy={y} r="13" fill="#164a3d" stroke="#ffffff" strokeWidth="1.5" />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#ffffff"
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-manrope), sans-serif"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
