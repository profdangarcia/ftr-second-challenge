import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Badge, getBadgeVariantFromColor } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatShortDate } from "@/lib/utils"
import { CATEGORY_ICON_COMPONENTS, type CategoryIconId } from "@/helpers/categoryIcons"
import type { TransactionItemGql } from "@/lib/graphql/queries/ListMyTransactions"
import type { CategoryGql } from "@/lib/graphql/queries/ListMyCategories"
import { useTransactionDialogStore } from "@/stores/transactionDialog"
import {
  CircleArrowDownIcon,
  CircleArrowUpIcon,
  Pencil,
  ReceiptText,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface TransactionTableRowProps {
  transaction: TransactionItemGql
  category?: CategoryGql
  onDeleteClick: (transaction: TransactionItemGql) => void
}

export function TransactionTableRow({ transaction: tx, category, onDeleteClick }: TransactionTableRowProps) {
  const openForEdit = useTransactionDialogStore((s) => s.openForEdit)
  const isIncome = tx.type === "INCOME"
  const variant = getBadgeVariantFromColor(category?.color ?? "default")
  const IconComponent =
    category?.icon && category.icon in CATEGORY_ICON_COMPONENTS
      ? CATEGORY_ICON_COMPONENTS[category.icon as CategoryIconId]
      : ReceiptText

  return (
    <TableRow className="border-b border-gray-200">
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Badge
            variant={variant}
            icon={<IconComponent className="size-4" />}
            className="h-9 w-9 shrink-0 p-0"
          />
          <span className="text-sm font-medium text-gray-800">{tx.description}</span>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-600">
        {formatShortDate(tx.date)}
      </TableCell>
      <TableCell className="px-4 py-3">
        {category ? (
          <Badge variant={variant} className="text-xs">
            {category.title}
          </Badge>
        ) : (
          <span className="text-sm text-gray-500">—</span>
        )}
      </TableCell>
      <TableCell className="px-4 py-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium",
            isIncome ? "text-green-dark" : "text-red-dark"
          )}
        >
          {isIncome ? (
            <CircleArrowUpIcon className="size-4 shrink-0" />
          ) : (
            <CircleArrowDownIcon className="size-4 shrink-0" />
          )}
          {isIncome ? "Entrada" : "Saída"}
        </span>
      </TableCell>
      <TableCell className="px-4 py-3 text-sm font-semibold text-gray-800">
        {isIncome ? "+" : "-"} {formatCurrency(tx.value / 100)}
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Excluir"
            onClick={() => onDeleteClick(tx)}
          >
            <Trash2 className="text-danger" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Editar"
            onClick={() => openForEdit(tx)}
          >
            <Pencil className="text-gray-700" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
