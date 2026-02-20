import { gql } from "@apollo/client"

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    getDashboardData {
      totalBalance
      monthlyIncome
      monthlyExpenses
      recentTransactions {
        id
      }
      categorySummaries {
        categoryId
        title
        color
        itemCount
        totalValue
      }
    }
  }
`

export interface CategorySummaryItemGql {
  categoryId: string
  title: string
  color: string
  itemCount: number
  totalValue: number
}

export interface GetDashboardDataQuery {
  getDashboardData: {
    totalBalance: number
    monthlyIncome: number
    monthlyExpenses: number
    recentTransactions: { id: string }[]
    categorySummaries: CategorySummaryItemGql[]
  }
}
