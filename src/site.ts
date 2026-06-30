/* =====================================================================
   Fonte única de contato/identidade técnica do site.
   Cada UNIDADE tem o seu próprio telefone/WhatsApp (ver src/content/units).
   Aqui ficam os dados gerais da rede e os helpers de link.
   ===================================================================== */

export const site = {
  /** Domínio final — mantenha igual ao `SITE` em astro.config.mjs. */
  url: "https://lamina-barbearia.com.br",
  email: "contato@lamina-barbearia.com.br",

  /** WhatsApp geral da rede. DDI + DDD, SÓ dígitos. (fictício) */
  whatsapp: "5548988880000",
  /** Telefone geral exibido (formatado). */
  phone: "(48) 3030-1000",

  /** Localização macro (texto + schema). */
  region: "Grande Florianópolis, SC",
  country: "BR",

  /** Redes — string vazia ("") oculta o link. */
  social: {
    instagram: "https://instagram.com/lamina.clube",
  },
} as const;

/** Monta link wa.me com mensagem pré-preenchida. */
export function whatsappLink(message: string, number: string = site.whatsapp): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Monta link tel: a partir de um telefone formatado. */
export function telLink(phone: string = site.phone): string {
  return `tel:+55${phone.replace(/\D/g, "")}`;
}

/** Link de "ver no mapa" a partir de uma busca textual. */
export function mapLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
