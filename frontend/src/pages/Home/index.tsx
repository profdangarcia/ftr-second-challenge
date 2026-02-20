import { useQuery } from "@apollo/client/react"
import { Page } from "@/components/Page"
import { SummaryCard } from "./components/SummaryCard"
import { CategorySummary, type CategorySummaryItem } from "./components/CategorySummary"
import { RecentTransactions } from "./components/RecentTransactions"
import { GET_DASHBOARD_DATA, type GetDashboardDataQuery } from "@/lib/graphql/queries/GetDashboardData"
import { CircleArrowDownIcon, CircleArrowUpIcon, WalletIcon } from "lucide-react"

const CENTAVOS_TO_REAIS = 1 / 100

export function Home() {
  const { data, loading, error } = useQuery<GetDashboardDataQuery>(GET_DASHBOARD_DATA)

  const dashboard = data?.getDashboardData
  const totalBalanceReais =
    dashboard?.totalBalance ? dashboard.totalBalance * CENTAVOS_TO_REAIS : 0
  const monthlyIncomeReais =
    dashboard?.monthlyIncome ? dashboard.monthlyIncome * CENTAVOS_TO_REAIS : 0
  const monthlyExpensesReais =
    dashboard?.monthlyExpenses ? dashboard.monthlyExpenses * CENTAVOS_TO_REAIS : 0
  const categorySummaries: CategorySummaryItem[] = dashboard?.categorySummaries ?? []
  const recentTransactions = dashboard?.recentTransactions ?? []

  return (
    <Page>
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full gap-6">
          <SummaryCard
            value={error ? undefined : totalBalanceReais}
            loading={loading}
            icon={<WalletIcon className="text-purple-base" />}
            text="Saldo Total"
          />
          <SummaryCard
            value={error ? undefined : monthlyIncomeReais}
            loading={loading}
            icon={<CircleArrowUpIcon className="text-brand-base" />}
            text="Receitas do Mês"
          />
          <SummaryCard
            value={error ? undefined : monthlyExpensesReais}
            loading={loading}
            icon={<CircleArrowDownIcon className="text-red-base" />}
            text="Despesas do Mês"
          />
        </div>
        <div className="flex w-full gap-6">
          <RecentTransactions
            recentTransactions={recentTransactions}
            categorySummaries={categorySummaries}
          />
          <CategorySummary categorySummaries={categorySummaries} />
        </div>
      </div>
    </Page>
  )
}
