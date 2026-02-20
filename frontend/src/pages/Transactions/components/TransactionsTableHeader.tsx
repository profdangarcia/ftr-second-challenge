import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const HEADER_CELL_CLASS =
  "h-12 px-4 text-xs font-medium uppercase tracking-wide text-gray-500"

export function TransactionsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="border-gray-200 hover:bg-transparent">
        <TableHead className={HEADER_CELL_CLASS}>Descrição</TableHead>
        <TableHead className={HEADER_CELL_CLASS}>Data</TableHead>
        <TableHead className={HEADER_CELL_CLASS}>Categoria</TableHead>
        <TableHead className={HEADER_CELL_CLASS}>Tipo</TableHead>
        <TableHead className={HEADER_CELL_CLASS}>Valor</TableHead>
        <TableHead className={cn(HEADER_CELL_CLASS, "w-[120px]")}>Ações</TableHead>
      </TableRow>
    </TableHeader>
  )
}
