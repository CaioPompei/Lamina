# CLAUDE.md — Projeto "Lâmina" (site-conceito: rede de barbearia)

> Fonte de verdade DESTE projeto. Antes de qualquer tarefa aqui, leia também o
> CLAUDE.md-mãe em `c:\Users\caiop\AikTech\CLAUDE.md` (regras do negócio, funil,
> preços, guardrails). Este arquivo cobre só o que é específico deste projeto.
> Em conflito, o CLAUDE.md-mãe vence nas regras de negócio; este vence nos detalhes
> técnicos e de design da Lâmina.

---

## 1. O que é este projeto

Site-conceito de uma **rede de barbearia FICTÍCIA com 3 unidades** ("Lâmina — Clube de
Barbearia"), na Grande Florianópolis. Não é cliente real; não há contrato. Foi criado
de propósito para três funções:

1. **Amostra de serviço** para prospects que têm várias unidades (em especial a
   **Trindade Trajes** — aluguel de trajes, 5 lojas). Responde direto ao "WordPress ou
   template?" e mostra o "várias unidades" que eles querem ver.
2. **Peça do nicho beleza** no portfólio do Caio.
3. **Template reaproveitável** de "rede com várias unidades" para outros nichos.

Estado no funil: não se aplica (é exemplo/portfólio, não cliente). Tratar como **Build/Review**
de uma peça de portfólio, nunca como Launch de cliente pagante.

## 2. Regras inegociáveis deste projeto

- **Marca e dados são fictícios.** O rótulo **"Projeto conceito"** fica visível no rodapé
  (`brand.concept = true` em `src/brand.ts`). Nunca remover isso enquanto for demonstração.
- **Nenhuma métrica inventada.** Diferente de partes antigas do portfólio, aqui NÃO há
  "+38%", "210 leads" etc. Não introduzir números de resultado falsos.
- **Não usar a marca de um prospect real** (ex.: nunca renomear para "Trindade") nem fotos
  reais de terceiros sem permissão. É conceito, com identidade própria.
- Seguir a **Definition of Done** do CLAUDE.md-mãe (§9) no que se aplica a um conceito
  (responsivo, SEO, schema, WhatsApp, sem placeholder, português revisado, Lighthouse ≥90).
  NÃO se aplica: "cliente aprovou", domínio real, política LGPD (não há formulário).

## 3. Stack e decisões já tomadas

- **Astro estático** (`astro ^4.16`, `type: module`), build → `dist`, deploy Vercel/Netlify grátis.
- **Sem framework de UI, sem CMS, sem banco.** JS só se realmente necessário.
- **Dados em content collection** `units` (`type: "data"`), 1 JSON por unidade.
- **Fontes self-hosted** via `@fontsource-variable`: Bricolage Grotesque (display) +
  Hanken Grotesk (corpo). Importadas em `src/layouts/Base.astro`.
- **Sem agendamento online** (YAGNI): CTA por WhatsApp + telefone, por unidade.
- **Página por unidade** (`/centro`, `/kobrasol`, `/estreito`) — SEO local próprio, escala p/ 5+.
- **Idioma:** só PT-BR (negócio local; sem i18n).

### Gotchas do ambiente (não repetir o erro)
- **Node 20.11 quebra `@astrojs/sitemap` 3.2** → o sitemap é um endpoint à mão em
  `src/pages/sitemap.xml.ts`. Não trocar pela integração.
- **Screenshot local:** Edge headless **clássico** funciona; `--headless=new` não gravou
  arquivo neste ambiente. Comando que funciona:
  `msedge --headless --disable-gpu --no-sandbox --no-first-run --user-data-dir=<tmp>
   --hide-scrollbars --window-size=W,H --virtual-time-budget=6000 --screenshot=<png> <url>`.
  Captura a altura da janela (`window-size` H), não a página inteira. **Atenção:** os heros
  usam `svh`, então aumentar H também estica o hero — para ver seções de baixo, prefira
  capturar uma **página de unidade** (hero 72svh) em vez da home (88svh).
- Servir o build antes de capturar (`npm run preview` em :4321); `file://` quebra os
  caminhos absolutos de asset (`/fotos`, `/_astro`).
- **URL com `#fragmento` + `--screenshot` NÃO funciona** (sai tela escura/incompleta).
  Para ver seções abaixo da dobra: copiar `dist/<pagina>/index.html` para
  `dist/_shot/index.html` injetando `<style>.uhero{min-height:30svh!important}</style>`
  via sed, capturar com janela alta (ex.: 1440×5200) + `--force-prefers-reduced-motion`
  (desliga reveal/smooth-scroll → tudo visível) e apagar `dist/_shot` depois.
- `--blink-settings=scriptEnabled=false` também não grava arquivo neste ambiente.

## 4. Mapa de arquivos

```
exemplos/lamina/
  src/
    brand.ts                  # NOME, tagline, ano, flag de conceito → renomear a marca aqui
    site.ts                   # contato geral da rede + helpers (whatsappLink/telLink/mapLink)
    styles/global.css         # design tokens (cores, fontes, escala) + base + grão + botões
    lib/units.ts              # getUnits(), unitSlug(), unitIndex()
    content/
      config.ts               # schema Zod da coleção "units" (Unidade→Categoria→Item)
      units/{centro,kobrasol,estreito}.json   # 1 arquivo = 1 unidade (nome do arquivo = URL)
    layouts/Base.astro        # shell HTML, importa fontes + global.css, Header/Footer
    components/
      BaseHead.astro          # meta/OG/JSON-LD (recebe jsonLd como prop)
      Header.astro / Footer.astro
      CategoryBlock.astro     # uma categoria do cardápio (menu de preços)
    pages/
      index.astro             # home
      [unit].astro            # página por unidade (getStaticPaths a partir de getUnits)
      sitemap.xml.ts          # sitemap à mão
      404.astro
  public/
    fotos/*.webp              # fotografia real (Unsplash): heros 1920px + oficio + ritual-{1,2,3}
    fotos/servicos/*.webp     # 1 foto 800×1000 (4:5) por serviço, nome = slug do serviço
    favicon.svg, og.jpg, robots.txt
  README.md                   # como rodar / editar / reusar
```

## 5. Modelo de dados (genérico p/ virar template)

Hierarquia **Unidade → Categoria → Item** (`src/content/config.ts`). Campos do item:
`name`, `description?`, `meta?` (livre: "45 min" / "sob medida"), `price?` (string, aceita
"R$ 60" ou "sob consulta").

**Adicionar unidade** = criar `src/content/units/<slug>.json` + hero em `public/fotos/`.
O layout, o footer, o sitemap e o JSON-LD se ajustam sozinhos (tudo lê de `getUnits()`).

**Reusar para outro nicho (ex.: loja de trajes):** mesma estrutura, só muda o conteúdo —
`categoria: "Noivos" → itens: [{ name: "Smoking slim", meta: "sob medida", price: "sob consulta" }]`.
Quando for fazer o site real da Trindade, copiar este projeto como base.

## 6. Design system — e os GUARDRAILS ANTI-CLICHÊ DE IA (crítico)

Direção: **clube de barbearia premium, QUENTE e artesanal**, ancorado no mundo real
(couro, latão, navalha, madeira). O operador pediu explicitamente para **fugir do "cara de
site de IA"**. Isso é requisito, não preferência.

Tokens (em `src/styles/global.css :root`):
- `--carvao` #1d1712 (fundo escuro **quente** — NUNCA #000), `--carvao-2` #271f18
- `--bone` #efe9dd, `--ink` #1f1812 (texto sobre papel)
- `--latao` #c79a4b (acento ÚNICO), `--oxblood` #5e2a28 (raríssimo)
- Display: Bricolage Grotesque · Corpo: Hanken Grotesk

**NÃO FAZER (vira "site de IA"):** ❌ preto puro · ❌ glow/gradiente brilhante ·
❌ glassmorphism/cards de vidro · ❌ acento neon · ❌ hero centralizado com headline em
gradiente · ❌ grade de "feature cards" genérica · ❌ Inter.

**FAZER:** ✅ fotografia editorial em tela cheia conduzindo o layout · ✅ assimetria e
respiro · ✅ latão só como **fio fino** / índice / detalhe (nunca botão brilhante) ·
✅ textura de **grão** sutil · ✅ tipografia grande e confiante · ✅ ritmo escuro↔papel.

**Elemento-assinatura (um só):** o **índice de unidade 01/02/03** em display + o **fio de
latão vertical** (espinha). Justificado: codifica algo real (a sequência das unidades),
não é decoração. Antes de entregar, "tirar um acessório".

Processo ao mexer no visual: brainstorm → critique contra o briefing → codifica →
**critique por screenshot** (Edge) contra os guardrails acima → ajusta.

## 7. Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # gera dist/
npm run preview   # serve o build (use antes de tirar screenshot)
```

## 8. Pendências antes de um uso "de verdade"

- [x] ~~Trocar SVGs por fotografia real~~ → fotos Unsplash em WebP (heros 1920px, cards 4:5 800×1000).
      Num cliente real, substituir pelas fotos do estabelecimento (mesmos nomes/tamanhos).
- [x] ~~Rasterizar OG~~ → `public/og.jpg` 1200×630 (foto + wordmark), default em `BaseHead.astro`.
- [ ] Domínio real em `astro.config.mjs` (SITE), `src/site.ts`, `public/robots.txt`.
- [ ] Rodar **Lighthouse** e confirmar ≥90 nas 4 categorias (esperado ~100).
- [ ] (Se virar base da Trindade) copiar o projeto e fazer o briefing/proposta/contrato+sinal
      ANTES de construir o site real deles — ver funil no CLAUDE.md-mãe.

## 9. Como me acionar neste projeto

- `adicionar unidade <bairro>` → criar o JSON + hero e validar o build.
- `editar serviços <unidade>` → mexer no `categories` do JSON daquela unidade.
- `renomear marca <novo nome>` → trocar `src/brand.ts` (e revisar textos do hero/SEO).
- `revisar` → rodar a Definition of Done aplicável + screenshot + checagem anti-IA.
- `virar template <nicho>` → duplicar a estrutura e adaptar campos para o novo nicho.
