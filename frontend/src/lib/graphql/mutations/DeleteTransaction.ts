import { gql } from "@apollo/client"

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`

const REFETCH_QUERIES: string[] = ["GetDashboardData", "ListMyTransactions"]

export const DELETE_TRANSACTION_OPTIONS = { refetchQueries: REFETCH_QUERIES } as const
