import { Page } from "@/components/Page"
import { SummaryCard } from "@/components/SummaryCard"
import { CircleArrowDownIcon, CircleArrowUpIcon, WalletIcon } from "lucide-react"

export function Home() {
  return (
    <Page>
      <div className="flex w-full gap-4">
        <SummaryCard 
          value={1000} 
          icon={<WalletIcon className="text-purple-base"/>} 
          text="Saldo Total"
        />
        <SummaryCard 
          value={1000} 
          icon={<CircleArrowUpIcon className="text-brand-base"/>} 
          text="Receitas do Mês"
        />
        <SummaryCard 
          value={1000} 
          icon={<CircleArrowDownIcon className="text-red-base"/>} 
          text="Despesas do Mês"
        />
      </div>
    </Page>
  )
}
