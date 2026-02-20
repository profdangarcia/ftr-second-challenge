import { gql } from "@apollo/client"

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      categoryId
      type
      description
      date
      value
    }
  }
`

export interface CreateTransactionInput {
  categoryId: string
  type: string
  description: string
  date: string
  value: number
}

export interface CreateTransactionMutation {
  createTransaction: {
    id: string
    categoryId: string
    type: string
    description: string
    date: string
    value: number
  }
}
