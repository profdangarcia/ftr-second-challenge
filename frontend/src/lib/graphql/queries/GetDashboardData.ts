import { gql } from "@apollo/client"

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    getDashboardData {
      totalBalance
      monthlyIncome
      monthlyExpenses
      recentTransactions {
        id
        categoryId
        type
        description
        date
        value
      }
      categorySummaries {
        categoryId
        title
        icon
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
  icon: string
  color: string
  itemCount: number
  totalValue: number
}

export interface RecentTransactionGql {
  id: string
  categoryId: string
  type: string
  description: string
  date: string
  value: number
}

export interface GetDashboardDataQuery {
  getDashboardData: {
    totalBalance: number
    monthlyIncome: number
    monthlyExpenses: number
    recentTransactions: RecentTransactionGql[]
    categorySummaries: CategorySummaryItemGql[]
  }
}
