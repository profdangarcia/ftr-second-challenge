import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge, getBadgeVariantFromColor } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

export interface CategorySummaryItem {
  categoryId: string
  title: string
  color: string
  icon?: string
  itemCount: number
  totalValue: number
}

interface CategorySummaryProps {
  categorySummaries: CategorySummaryItem[]
  className?: string
}

export function CategorySummary({
  categorySummaries,
  className,
}: CategorySummaryProps) {
  return (
    <Card className={cn("rounded-xl max-w-[calc(34%-1.5rem)] w-full self-start", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-200 pb-4">
        <h2 className="text-[0.75rem] font-medium uppercase tracking-wide text-gray-500">
          Categorias
        </h2>
        <Button variant="link" className="p-0 text-brand-base" asChild size="sm">
          <Link to="/categorias">
            Gerenciar <ChevronRight />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        {categorySummaries.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-500">
            Nenhuma categoria com movimentação no período.
          </p>
        ) : (
          <ul className="space-y-3">
            {categorySummaries.map((item) => (
              <li
                key={item.categoryId}
                className="flex flex-wrap items-center justify-between gap-2"
              >
                <Badge
                  variant={getBadgeVariantFromColor(item.color)}
                  className="shrink-0"
                >
                  {item.title}
                </Badge>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="text-sm">
                    {item.itemCount} {item.itemCount === 1 ? "item" : "itens"}
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {formatCurrency(item.totalValue / 100)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
