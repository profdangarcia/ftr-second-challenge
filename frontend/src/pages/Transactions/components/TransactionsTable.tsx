import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { TransactionsTableHeader } from "./TransactionsTableHeader"
import { TransactionTableRow } from "./TransactionTableRow"
import { TransactionsTablePaginator } from "./TransactionsTablePaginator"
import type { TransactionItemGql } from "@/lib/graphql/queries/ListMyTransactions"
import type { CategoryGql } from "@/lib/graphql/queries/ListMyCategories"

const PAGE_SIZE = 10

export interface TransactionsTableProps {
  items: TransactionItemGql[]
  categories: CategoryGql[]
  total: number
  page: number
  pageSize?: number
  onPageChange: (page: number) => void
  onDeleteClick: (transaction: TransactionItemGql) => void
}

export function TransactionsTable({
  items,
  categories,
  total,
  page,
  pageSize = PAGE_SIZE,
  onPageChange,
  onDeleteClick,
}: TransactionsTableProps) {
  const categoryById = new Map(categories.map((c) => [c.id, c]))

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
                onDeleteClick={onDeleteClick}
              />
            ))
          )}
        </TableBody>
      </Table>
      {total > 0 && (
        <TransactionsTablePaginator
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </Card>
  )
}
