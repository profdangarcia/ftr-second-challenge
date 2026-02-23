import { gql } from "@apollo/client"

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      title
      description
      icon
      color
      transactionCount
    }
  }
`

export interface CreateCategoryInput {
  title: string
  description?: string | null
  icon: string
  color: string
}

export interface CreateCategoryMutation {
  createCategory: {
    id: string
    title: string
    description?: string | null
    icon: string
    color: string
    transactionCount: number
  }
}
