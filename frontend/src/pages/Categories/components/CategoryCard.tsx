import { Card, CardContent } from "@/components/ui/card"
import { Badge, getBadgeVariantFromColor } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CATEGORY_ICON_COMPONENTS, type CategoryIconId } from "@/helpers/categoryIcons"
import type { CategoryGql } from "@/lib/graphql/queries/ListMyCategories"
import { useCategoryDialogStore } from "@/stores/categoryDialog"
import { Pencil, ReceiptText, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CategoryCardProps {
  category: CategoryGql
  className?: string
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const openForEdit = useCategoryDialogStore((s) => s.openForEdit)
  const variant = getBadgeVariantFromColor(category.color)
  const IconComponent =
    category.icon in CATEGORY_ICON_COMPONENTS
      ? CATEGORY_ICON_COMPONENTS[category.icon as CategoryIconId]
      : ReceiptText

  const handleEdit = () => {
    openForEdit(category)
  }

  const handleDelete = () => {
    // TODO: excluir categoria
  }

  return (
    <Card className={cn("rounded-xl shadow-sm", className)}>
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start gap-3">
          <Badge
            variant={variant}
            icon={<IconComponent className="size-4" />}
            className="h-10 w-10 shrink-0 p-0"
          />
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Excluir"
              onClick={handleDelete}
            >
              <Trash2 className="text-danger" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Editar"
              onClick={handleEdit}
            >
              <Pencil className="text-gray-700" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className="text-base font-bold text-gray-800 truncate">
            {category.title}
          </h3>
          {category.description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {category.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100">
          <Badge variant={variant} className="text-xs">
            {category.title}
          </Badge>
          <span className="text-sm text-gray-500 tabular-nums">
            {category.transactionCount} {category.transactionCount === 1 ? "item" : "itens"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
