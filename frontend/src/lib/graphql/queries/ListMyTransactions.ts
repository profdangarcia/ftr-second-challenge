import { gql } from "@apollo/client"

export const LIST_MY_TRANSACTIONS = gql`
  query ListMyTransactions(
    $description: String
    $type: TransactionType
    $categoryId: String
    $startDate: String
    $endDate: String
    $limit: Int
    $offset: Int
  ) {
    listMyTransactions(
      description: $description
      type: $type
      categoryId: $categoryId
      startDate: $startDate
      endDate: $endDate
      limit: $limit
      offset: $offset
    ) {
      items {
        id
        categoryId
        type
        description
        date
        value
      }
      total
    }
  }
`

export interface TransactionItemGql {
  id: string
  categoryId: string
  type: string
  description: string
  date: string
  value: number
}

export interface ListMyTransactionsQuery {
  listMyTransactions: {
    items: TransactionItemGql[]
    total: number
  }
}

export interface ListMyTransactionsVariables {
  description?: string | null
  type?: string | null
  categoryId?: string | null
  startDate?: string | null
  endDate?: string | null
  limit?: number
  offset?: number
}
