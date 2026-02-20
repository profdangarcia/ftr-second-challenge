import { gql } from "@apollo/client"

export const LIST_MY_CATEGORIES = gql`
  query ListMyCategories {
    listMyCategories {
      id
      title
    }
  }
`

export interface CategoryGql {
  id: string
  title: string
}

export interface ListMyCategoriesQuery {
  listMyCategories: CategoryGql[]
}
