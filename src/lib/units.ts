import { getCollection, type CollectionEntry } from "astro:content";

export type Unit = CollectionEntry<"units">;

/** Slug/URL da unidade a partir do nome do arquivo (robusto p/ .json|.yaml). */
export function unitSlug(unit: Unit): string {
  return unit.id.replace(/\.(json|ya?ml)$/i, "");
}

/** Índice formatado da unidade (01, 02, 03...) a partir de `order`. */
export function unitIndex(unit: Unit): string {
  return String(unit.data.order).padStart(2, "0");
}

/** Todas as unidades, ordenadas por `order`. */
export async function getUnits(): Promise<Unit[]> {
  const all = await getCollection("units");
  return all.sort((a, b) => a.data.order - b.data.order);
}
