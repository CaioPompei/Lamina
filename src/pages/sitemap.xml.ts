import type { APIRoute } from "astro";
import { getUnits, unitSlug } from "@/lib/units";

/* Sitemap gerado à mão (a integração @astrojs/sitemap 3.2 quebra no Node 20.11). */
export const GET: APIRoute = async ({ site }) => {
  const base = (site?.href ?? "https://lamina-barbearia.com.br/").replace(/\/$/, "");
  const units = await getUnits();
  const paths = ["/", ...units.map((u) => `/${unitSlug(u)}`)];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
