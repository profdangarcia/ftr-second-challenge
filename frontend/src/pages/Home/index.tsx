import { Page } from "@/components/Page"
import { SummaryCard } from "./components/SummaryCard"
import { CategorySummary, type CategorySummaryItem } from "./components/CategorySummary"
import { CircleArrowDownIcon, CircleArrowUpIcon, WalletIcon } from "lucide-react"

export function Home() {
  // TODO: substituir por dados de getDashboardData quando a query estiver integrada
  const categorySummaries: CategorySummaryItem[] = []

  return (
    <Page>
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full gap-6">
          <SummaryCard
            value={1000}
            icon={<WalletIcon className="text-purple-base" />}
            text="Saldo Total"
          />
          <SummaryCard
            value={1000}
            icon={<CircleArrowUpIcon className="text-brand-base" />}
            text="Receitas do Mês"
          />
          <SummaryCard
            value={1000}
            icon={<CircleArrowDownIcon className="text-red-base" />}
            text="Despesas do Mês"
          />
        </div>
        <div className="flex w-full gap-6">
          <CategorySummary categorySummaries={categorySummaries} />
        </div>
      </div>
    </Page>
  )
}
