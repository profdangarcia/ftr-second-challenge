import { gql } from "@apollo/client"

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: String!, $data: UpdateCategoryInput!) {
    updateCategory(id: $id, data: $data) {
      id
      title
      description
      icon
      color
      transactionCount
    }
  }
`

export interface UpdateCategoryInput {
  title?: string | null
  description?: string | null
  icon?: string | null
  color?: string | null
}

export interface UpdateCategoryMutation {
  updateCategory: {
    id: string
    title: string
    description?: string | null
    icon: string
    color: string
    transactionCount: number
  }
}
