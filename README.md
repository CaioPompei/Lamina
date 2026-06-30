# Lâmina — Clube de Barbearia (projeto conceito)

Site-conceito de uma **rede de barbearia fictícia com 3 unidades**, criado para:

1. demonstrar a arquitetura **Unidade → Categoria → Item** (a mesma que uma loja de
   trajes com várias lojas precisa) — serve de amostra de serviço para prospects;
2. preencher o nicho **beleza** no portfólio do Caio;
3. virar **template reaproveitável** de "rede com várias unidades" para outros nichos.

> ⚠️ **Marca e dados são fictícios.** Nunca apresentar como cliente real.
> O rótulo "Projeto conceito" aparece no rodapé.

## Rodar

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # gera dist/ (deploy: Vercel/Netlify, output "dist")
npm run preview   # serve o build
```

Ambiente: Node 20.11+, Astro 4. Sem CMS, sem banco, sem JS de framework.

## Stack / decisões

- **Astro estático** + **content collections** (dados em `src/content/units/*.json`).
- **Fontes self-hosted** (`@fontsource-variable`): Bricolage Grotesque (display) + Hanken Grotesk (corpo).
- **SEO local**: `BaseHead.astro` + JSON-LD `Organization` (home) e `BarberShop` por unidade;
  sitemap à mão em `src/pages/sitemap.xml.ts` (a integração @astrojs/sitemap 3.2 quebra no Node 20.11).
- **Sem agendamento online** (YAGNI): CTA por WhatsApp/telefone por unidade.
- **Página por unidade** (`/centro`, `/kobrasol`, `/estreito`) → SEO local próprio, escala p/ 5+ lojas.

## Como editar

| O quê | Onde |
|---|---|
| Nome/tagline/ano da marca | `src/brand.ts` |
| Contato geral + WhatsApp da rede | `src/site.ts` |
| Cores e tipografia (tokens) | `src/styles/global.css` (`:root`) |
| **Adicionar uma unidade** | criar `src/content/units/<slug>.json` (a URL = nome do arquivo) + hero em `public/fotos/` |
| Serviços/preços de uma unidade | o array `categories` dentro do JSON da unidade |

**Adicionar a 4ª/5ª loja = 1 arquivo JSON.** O layout e o SEO se ajustam sozinhos.

### Reusar para outro nicho (ex.: loja de trajes)
A estrutura `Unidade → Categoria → Item` é genérica. Para trajes, o mesmo JSON vira:
`categoria: "Noivos" → itens: [{ name: "Smoking slim", meta: "sob medida", price: "sob consulta" }]`.
Só muda o conteúdo dos campos, não o formato.

## Pendências antes de um uso "de verdade"

- [ ] Trocar os SVGs placeholder de `public/fotos/` por **fotografia real** (WebP).
- [ ] Rasterizar o Open Graph: hoje é `public/og.svg`; gerar `og.png` (1200×630) e
      apontar o default em `src/components/BaseHead.astro`.
- [ ] Definir domínio real em `astro.config.mjs` (SITE), `src/site.ts` e `public/robots.txt`.
- [ ] Rodar Lighthouse e confirmar ≥90 nas 4 categorias (esperado ~100: estático, CSS inlinado, fontes locais).
