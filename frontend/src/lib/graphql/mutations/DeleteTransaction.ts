import { gql } from "@apollo/client"
import { evictTransactionDependentQueries } from "@/lib/graphql/evictTransactionQueries"

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`

export const DELETE_TRANSACTION_OPTIONS = {
  update(cache: Parameters<typeof evictTransactionDependentQueries>[0]) {
    evictTransactionDependentQueries(cache)
  },
} as const
