import { gql } from "@apollo/client"

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: String!, $data: UpdateTransactionInput!) {
    updateTransaction(id: $id, data: $data) {
      id
      categoryId
      type
      description
      date
      value
    }
  }
`

export interface UpdateTransactionInput {
  categoryId?: string | null
  type?: string | null
  description?: string | null
  date?: string | null
  value?: number | null
}

export interface UpdateTransactionMutation {
  updateTransaction: {
    id: string
    categoryId: string
    type: string
    description: string
    date: string
    value: number
  }
}
