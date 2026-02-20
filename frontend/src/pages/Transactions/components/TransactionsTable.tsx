import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge, getBadgeVariantFromColor } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatShortDate } from "@/lib/utils"
import { CATEGORY_ICON_COMPONENTS, type CategoryIconId } from "@/helpers/categoryIcons"
import {
  type TransactionItemGql,
} from "@/lib/graphql/queries/ListMyTransactions"
import type { CategoryGql } from "@/lib/graphql/queries/ListMyCategories"
import {
  ChevronLeft,
  ChevronRight,
  CircleArrowDownIcon,
  CircleArrowUpIcon,
  Pencil,
  ReceiptText,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 10

export interface TransactionsTableProps {
  items: TransactionItemGql[]
  categories: CategoryGql[]
  total: number
  page: number
  pageSize?: number
  onPageChange: (page: number) => void
}

export function TransactionsTable({
  items,
  categories,
  total,
  page,
  pageSize = PAGE_SIZE,
  onPageChange,
}: TransactionsTableProps) {
  const categoryById = new Map(categories.map((c) => [c.id, c]))
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <Card className="rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200 hover:bg-transparent">
            <TableHead className="h-12 px-4 text-xs font-medium uppercase tracking-wide text-gray-500">
              Descrição
            </TableHead>
            <TableHead className="h-12 px-4 text-xs font-medium uppercase tracking-wide text-gray-500">
              Data
            </TableHead>
            <TableHead className="h-12 px-4 text-xs font-medium uppercase tracking-wide text-gray-500">
              Categoria
            </TableHead>
            <TableHead className="h-12 px-4 text-xs font-medium uppercase tracking-wide text-gray-500">
              Tipo
            </TableHead>
            <TableHead className="h-12 px-4 text-xs font-medium uppercase tracking-wide text-gray-500">
              Valor
            </TableHead>
            <TableHead className="h-12 px-4 text-xs font-medium uppercase tracking-wide text-gray-500 w-[120px]">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr]:border-b [&_tr]:border-gray-200 [&_tr:last-child]:border-b">
          {items.length === 0 ? (
            <TableRow className="hover:bg-transparent border-b border-gray-200">
              <TableCell
                colSpan={6}
                className="py-12 text-center text-sm text-gray-500"
              >
                Nenhuma transação encontrada.
              </TableCell>
            </TableRow>
          ) : (
            items.map((tx) => {
              const category = categoryById.get(tx.categoryId)
              const isIncome = tx.type === "INCOME"
              const variant = getBadgeVariantFromColor(category?.color ?? "default")
              const IconComponent =
                category?.icon && category.icon in CATEGORY_ICON_COMPONENTS
                  ? CATEGORY_ICON_COMPONENTS[category.icon as CategoryIconId]
                  : ReceiptText

              return (
                <TableRow key={tx.id} className="border-b border-gray-200">
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={variant}
                        icon={<IconComponent className="size-4" />}
                        className="h-9 w-9 shrink-0 p-0"
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {tx.description}
                      </span>
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
                  <TableCell
                    className={"px-4 py-3 text-sm font-semibold text-gray-800"}
                  >
                    {isIncome ? "+" : "-"} {formatCurrency(tx.value / 100)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Excluir"
                        onClick={() => {}}
                      >
                        <Trash2 className="text-danger" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Editar"
                        onClick={() => {}}
                      >
                        <Pencil className="text-gray-700" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
      {total > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 bg-gray-50/50 px-4 py-3">
          <p className="text-sm text-gray-600">
            {start} a {end} | {total} resultado{total !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              aria-label="Página anterior"
            >
              <ChevronLeft className="size-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                type="button"
                variant={p === page ? "default" : "outline"}
                size="sm"
                className={cn(
                  "min-w-8 h-8",
                  p === page && "bg-brand-base hover:bg-brand-dark"
                )}
                onClick={() => onPageChange(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              aria-label="Próxima página"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
