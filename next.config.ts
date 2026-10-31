import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF preferido; WebP como fallback (planejamento, seção 7)
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    // Fixa a raiz do projeto (há um package-lock.json avulso em C:\Users\mayco)
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
