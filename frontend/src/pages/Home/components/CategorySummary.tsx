import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"

export interface CategorySummaryItem {
  categoryId: string
  title: string
  color: string
  itemCount: number
  totalValue: number
}

interface CategorySummaryProps {
  categorySummaries: CategorySummaryItem[]
  className?: string
}

const BADGE_VARIANTS = [
  "default",
  "blue",
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
] as const

function badgeVariantFromColor(color: string): (typeof BADGE_VARIANTS)[number] {
  const lower = color.toLowerCase()
  return BADGE_VARIANTS.includes(lower as (typeof BADGE_VARIANTS)[number])
    ? (lower as (typeof BADGE_VARIANTS)[number])
    : "default"
}

export function CategorySummary({
  categorySummaries,
  className,
}: CategorySummaryProps) {
  return (
    <Card className={cn("rounded-xl max-w-[calc(34%-1.5rem)] w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-200 pb-4">
        <h2 className="text-[0.75rem] font-medium uppercase tracking-wide text-gray-500">
          Categorias
        </h2>
        <Button variant="link" className="p-0 text-brand-base" asChild>
          <Link to="/categorias">Gerenciar &gt;</Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-3">
          {categorySummaries.map((item) => (
            <li
              key={item.categoryId}
              className="flex flex-wrap items-center justify-between gap-2"
            >
              <Badge
                variant={badgeVariantFromColor(item.color)}
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
      </CardContent>
    </Card>
  )
}
