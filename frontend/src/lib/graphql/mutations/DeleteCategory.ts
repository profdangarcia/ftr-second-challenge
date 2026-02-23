import { gql } from "@apollo/client"
import { evictTransactionDependentQueries } from "@/lib/graphql/evictTransactionQueries"

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`

/** Após excluir categoria, as transações vinculadas também são removidas; invalidar dashboard, transações e categorias. */
export const DELETE_CATEGORY_OPTIONS = {
  update(cache: Parameters<typeof evictTransactionDependentQueries>[0]) {
    evictTransactionDependentQueries(cache)
  },
} as const
