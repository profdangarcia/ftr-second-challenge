import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { TransactionsTableHeader } from "./TransactionsTableHeader"
import { TransactionTableRow } from "./TransactionTableRow"
import type { TransactionItemGql } from "@/lib/graphql/queries/ListMyTransactions"
import type { CategoryGql } from "@/lib/graphql/queries/ListMyCategories"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
        <TransactionsTableHeader />
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
            items.map((tx) => (
              <TransactionTableRow
                key={tx.id}
                transaction={tx}
                category={categoryById.get(tx.categoryId)}
              />
            ))
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
