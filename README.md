# Oxiclínica Presidente Prudente — landing page

Landing page institucional da Oxiclínica (Centro Médico Hiperbárico do Oeste Paulista).

**Stack:** Next.js 16 (App Router, `cacheComponents`, Turbopack), React 19, TypeScript, Tailwind CSS v4 (tokens em `src/app/globals.css`, sem `tailwind.config`), GSAP 3 + `@gsap/react`, `lucide-react`.

## Requisitos

- Node.js 20 ou superior (testado com 20.20) e npm 10.

## Como rodar

```bash
npm install
npm run dev          # http://localhost:3000
```

Produção local:

```bash
npm run build
npm run start -- -p 3100   # http://localhost:3100
```

Verificações (rode antes de publicar):

```bash
npm run lint
npx tsc --noEmit
npm run build
```

> Se uma alteração em `globals.css` não aparecer no build, apague `.next/cache/turbopack` e rode o build de novo.

## Variáveis de ambiente

| Variável | Obrigatória | Uso |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recomendada em produção | URL pública **sem barra final** (ex.: `https://www.dominio-da-clinica.com.br`). Usada em `metadataBase`, canonical, Open Graph, `robots.txt`, `sitemap.xml` e JSON-LD. |

Sem ela, o site usa o domínio de produção da Vercel (`VERCEL_PROJECT_PRODUCTION_URL`, definida automaticamente pela Vercel) e, fora da Vercel, `http://localhost:3000`. Localmente, crie um `.env.local` (já ignorado pelo git):

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Não há analytics, formulários ou chaves de API (o mapa usa o embed público do Google Maps).

## Onde editar

| O quê | Arquivo |
|---|---|
| Dados institucionais (endereço, telefones, WhatsApp, horários, Instagram, convênio, URL do site) | `src/lib/constants.ts` — fonte única; nada está duplicado nos componentes |
| Seções da página | `src/components/sections/*.tsx` (montadas em `src/app/page.tsx`) |
| Cores, fontes, espaçamentos | `src/app/globals.css` (`@theme`) |
| SEO / metadados | `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/components/seo/ClinicJsonLd.tsx` |
| Ícones e imagem de compartilhamento | `src/app/icon.png`, `apple-icon.png`, `favicon.ico`, `opengraph-image.png` (+ `opengraph-image.alt.txt`) |
| Logo | `public/images/logo-oxiclinica.png` e `logo-oxiclinica-white.png` (347×141). Para trocar pela versão original em alta resolução, substitua os arquivos mantendo os nomes e ajuste `width`/`height` em `src/components/ui/Logo.tsx`. |
| Política de privacidade (texto provisório, `noindex`) | `src/app/privacidade/page.tsx` |

Ao alterar horários, atualize também o campo `schema` de cada item de `OPENING_HOURS` (usado no JSON-LD).

## Como trocar a foto do Hero (`HERO_IMAGE`)

Hoje o Hero mostra uma ilustração técnica rotulada como "Ilustração representativa". Quando houver uma foto real da câmara hiperbárica **sem pessoas**:

1. Salve a imagem em `public/images/clinic/` (ex.: `camara-hiperbarica.webp`, de preferência ≥ 1200 px de largura).
2. Em `src/components/sections/Hero.tsx`, preencha a constante:

   ```ts
   const HERO_IMAGE: HeroImage | null = {
     src: "/images/clinic/camara-hiperbarica.webp",
     alt: "Câmara hiperbárica da Oxiclínica",
     width: 1200, // dimensões reais do arquivo
     height: 900,
   };
   ```

3. Pronto: o `HeroVisual` passa a usar `next/image` com preload/`fetchPriority="high"` (é o LCP) e a legenda da ilustração some.

## Deploy na Vercel (passo a passo — ainda não executado)

1. Faça commit do projeto e envie para um repositório (GitHub/GitLab/Bitbucket).
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório. Se o repositório contiver a pasta pai, defina **Root Directory** = `oxiclinica`.
3. Framework: **Next.js** (detectado automaticamente). Build `next build`, output padrão, Node 20+.
4. Em **Settings → Environment Variables**, crie `NEXT_PUBLIC_SITE_URL` (Production) com o domínio definitivo.
5. Clique em **Deploy**. Depois, em **Settings → Domains**, adicione o domínio da clínica e configure o DNS conforme indicado pela Vercel; faça um novo deploy se `NEXT_PUBLIC_SITE_URL` mudar.
6. Pós-deploy: confira `/robots.txt`, `/sitemap.xml`, o preview de compartilhamento (WhatsApp/Instagram), valide o JSON-LD no [Rich Results Test](https://search.google.com/test/rich-results) e rode o Lighthouse na URL de produção. Opcional: cadastrar o site no Google Search Console e vincular ao Perfil da Empresa no Google.

### Antes de publicar (dependem da clínica)

Veja `../REVISAO-CONTEUDO.md`: validação dos textos médicos pelo responsável técnico, autorização de uso de imagem, confirmação de horários/telefones/convênio/Instagram e texto definitivo da política de privacidade.
