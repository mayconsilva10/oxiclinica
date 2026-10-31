import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/** Apenas páginas indexáveis (/privacidade está com noindex enquanto o texto é provisório). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
