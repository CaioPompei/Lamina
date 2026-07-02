import { defineCollection, z } from "astro:content";

/* =====================================================================
   Coleção "units" — uma rede com várias unidades.
   Hierarquia: Unidade → Categoria → Item.
   Organização: src/content/units/<slug>.json  (o nome do arquivo = slug/URL)

   Esta MESMA estrutura serve para outros nichos (ex.: loja de trajes):
     Unidade → Categoria (Noivos/Smoking/Ternos) → Item (traje).
   Só muda o conteúdo dos campos, não o formato.
   ===================================================================== */

const item = z.object({
  /** Nome do serviço/item. */
  name: z.string(),
  /** Descrição curta (1 linha). */
  description: z.string().optional(),
  /** Metadado livre — barbearia: "45 min"; trajes: "sob medida". */
  meta: z.string().optional(),
  /** Preço como texto, p/ aceitar "R$ 60" ou "sob consulta".
      OBS.: não é exibido no site (preço só no WhatsApp) — fica como referência. */
  price: z.string().optional(),
  /** Foto do serviço (caminho em /public). Conduz a galeria da unidade. */
  image: z.string().optional(),
});

const category = z.object({
  name: z.string(),
  slug: z.string(),
  /** Frase de apoio opcional da categoria. */
  blurb: z.string().optional(),
  items: z.array(item),
});

const units = defineCollection({
  type: "data",
  schema: z.object({
    /** Nome da unidade exibido (ex.: "Lâmina Centro"). */
    name: z.string(),
    /** Bairro/cidade (ex.: "Centro, Florianópolis"). */
    neighborhood: z.string(),
    /** Ordem de exibição (menor primeiro). */
    order: z.number().default(0),

    /** Contato e localização (cada unidade tem o seu). */
    address: z.string(),
    phone: z.string(),
    whatsapp: z.string(), // DDI+DDD, só dígitos
    hours: z.array(z.object({ days: z.string(), time: z.string() })),
    mapQuery: z.string(),
    geo: z.object({ lat: z.number(), lng: z.number() }).optional(),

    /** Hero da unidade. */
    heroImage: z.string(),
    heroAlt: z.string(),
    intro: z.string(),
    highlights: z.array(z.string()).default([]),

    /** Cardápio de serviços, agrupado em categorias. */
    categories: z.array(category),
  }),
});

export const collections = { units };
