import { gql } from "@apollo/client"

export const LIST_MY_CATEGORIES = gql`
  query ListMyCategories {
    listMyCategories {
      id
      title
      description
      color
      icon
      transactionCount
    }
  }
`

export interface CategoryGql {
  id: string
  title: string
  description?: string | null
  color: string
  icon: string
  transactionCount: number
}

export interface ListMyCategoriesQuery {
  listMyCategories: CategoryGql[]
}
