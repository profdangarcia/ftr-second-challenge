/**
 * Valores do enum CategoryColor do backend (mesma key = mesma cor).
 * Usado para criar/editar categoria e exibir o seletor de cores.
 */
export const CATEGORY_COLOR_IDS = [
  "BLUE",
  "PURPLE",
  "PINK",
  "RED",
  "ORANGE",
  "YELLOW",
  "GREEN",
] as const

export type CategoryColorId = (typeof CATEGORY_COLOR_IDS)[number]

/**
 * Mapeia o ENUM do backend para a classe Tailwind da cor (COR-base).
 * Use para exibir o swatch (bg) ou ícone (text) da cor selecionada.
 */
export const CATEGORY_COLOR_CLASS: Record<CategoryColorId, string> = {
  BLUE: "bg-blue-base",
  PURPLE: "bg-purple-base",
  PINK: "bg-pink-base",
  RED: "bg-red-base",
  ORANGE: "bg-orange-base",
  YELLOW: "bg-yellow-base",
  GREEN: "bg-green-base",
}

/** Retorna a classe Tailwind da cor (ex.: "bg-green-base") para o ENUM do backend. */
export function getCategoryColorClass(color: string): string {
  const upper = color.toUpperCase()
  return CATEGORY_COLOR_CLASS[upper as CategoryColorId] ?? "bg-gray-400"
}
