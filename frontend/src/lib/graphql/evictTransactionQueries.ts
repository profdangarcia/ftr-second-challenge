import type { ApolloCache } from "@apollo/client"

/**
 * Remove do cache as queries que dependem de transações (dashboard, lista e categorias).
 * Após criar/editar/excluir transação, chame isso no `update` da mutation
 * para que, ao navegar para outra tela, os dados sejam buscados de novo.
 */
export function evictTransactionDependentQueries(cache: ApolloCache): void {
  cache.evict({ id: "ROOT_QUERY", fieldName: "getDashboardData" })
  cache.evict({ id: "ROOT_QUERY", fieldName: "listMyTransactions" })
  cache.evict({ id: "ROOT_QUERY", fieldName: "listMyCategories" })
  cache.gc()
}
