// @ts-check
import { defineConfig } from "astro/config";

// Troque pela URL real antes de publicar.
// Usado em canonical, sitemap, Open Graph e dados estruturados (JSON-LD).
export const SITE = "https://lamina-barbearia.com.br";

export default defineConfig({
  site: SITE,
  build: {
    // Inlina CSS pequeno automaticamente (menos requests, melhor LCP).
    inlineStylesheets: "auto",
  },
});
