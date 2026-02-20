import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge, getBadgeVariantFromColor } from "@/components/ui/badge"
import { formatCurrency, formatShortDate } from "@/lib/utils"
import { cn } from "@/lib/utils"
import {
  CATEGORY_ICON_COMPONENTS,
  type CategoryIconId,
} from "@/helpers/categoryIcons"
import { ChevronRight, CircleArrowDownIcon, CircleArrowUpIcon, Plus, ReceiptText } from "lucide-react"
import type { CategorySummaryItem } from "./CategorySummary"

export interface RecentTransactionItem {
  id: string
  categoryId: string
  type: string
  description: string
  date: string
  value: number
}

interface RecentTransactionsProps {
  recentTransactions: RecentTransactionItem[]
  categorySummaries: CategorySummaryItem[]
  className?: string
}

export function RecentTransactions({
  recentTransactions,
  categorySummaries,
  className,
}: RecentTransactionsProps) {
  const categoryById = new Map(
    categorySummaries.map((c) => [c.categoryId, c])
  )

  return (
    <Card className={cn("rounded-xl w-full self-start", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-200 pb-4">
        <h2 className="text-[0.75rem] font-medium uppercase tracking-wide text-gray-500">
          Transações recentes
        </h2>
        <Button variant="link" className="p-0 text-brand-base" asChild size="sm">
          <Link to="/transacoes">
            Ver todas <ChevronRight />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-2 pb-2">
        {recentTransactions.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">
            Nenhuma transação recente.
          </p>
        ) : (
          <ul className="-mx-6">
            {recentTransactions.map((tx) => {
              const category = categoryById.get(tx.categoryId)
              const isIncome = tx.type === "INCOME"
              const variant = getBadgeVariantFromColor(category?.color ?? "default")
              const IconComponent =
                category?.icon &&
                category.icon in CATEGORY_ICON_COMPONENTS
                  ? CATEGORY_ICON_COMPONENTS[category.icon as CategoryIconId]
                  : ReceiptText

              return (
                <li
                  key={tx.id}
                  className="flex flex-wrap items-center gap-3 px-6 py-3 border-b border-gray-200"
                >
                  <Badge
                    variant={variant}
                    icon={<IconComponent />}
                    className="h-10 w-10 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {tx.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatShortDate(tx.date)}
                    </p>
                  </div>
                  {category && (
                    <Badge
                      variant={variant}
                      className="shrink-0 text-xs"
                    >
                      {category.title}
                    </Badge>
                  )}
                  <div
                    className={cn(
                      "flex shrink-0 items-center gap-1 text-sm font-semibold ml-6"
                    )}
                  >
                    <span>
                      {isIncome ? "+" : "-"} {formatCurrency(tx.value / 100)}
                    </span>
                    {isIncome ? (
                      <CircleArrowUpIcon className="size-4 text-green-base" />
                    ) : (
                      <CircleArrowDownIcon className="size-4 text-red-base" />
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        <Button variant="link" className="mb-2 mt-4 w-full" onClick={() => {}} size="sm">
          <Plus /> Nova transação
        </Button>
      </CardContent>
    </Card>
  )
}
