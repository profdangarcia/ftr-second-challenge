import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TransactionsTablePaginatorProps {
  total: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
}

export function TransactionsTablePaginator({
  total,
  page,
  pageSize,
  onPageChange,
}: TransactionsTablePaginatorProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 bg-gray-50/50 px-4 py-3">
      <p className="text-sm text-gray-600">
        {start} a {end} | {total} resultado{total !== 1 ? "s" : ""}
      </p>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
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
            size="icon"
            active={p === page}
            onClick={() => onPageChange(p)}
            variant="outline"
          >
            {p}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Próxima página"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
