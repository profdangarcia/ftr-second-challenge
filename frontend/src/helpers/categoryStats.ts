/**
 * Dados agregados a partir de uma lista de categorias com contagem de transações.
 */
export interface CategoryStats<T extends { transactionCount: number }> {
  totalCategories: number
  totalTransactions: number
  mostUsedCategory: T | null
}

/**
 * Calcula totais e a categoria mais utilizada a partir de uma lista de categorias.
 */
export function getCategoryStats<T extends { transactionCount: number }>(
  categories: T[]
): CategoryStats<T> {
  const totalCategories = categories.length
  const { totalTransactions, mostUsedCategory } = categories.reduce(
    (acc, category) => {
      const nextSum = acc.totalTransactions + category.transactionCount
      const isMostUsed =
        category.transactionCount > (acc.mostUsedCategory?.transactionCount ?? -1)
      return {
        totalTransactions: nextSum,
        mostUsedCategory: isMostUsed ? category : acc.mostUsedCategory,
      }
    },
    { totalTransactions: 0, mostUsedCategory: null as T | null }
  )
  return {
    totalCategories,
    totalTransactions,
    mostUsedCategory,
  }
}
