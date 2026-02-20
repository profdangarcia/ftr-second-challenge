import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface SummaryCardProps {
  /** Ícone exibido ao lado do label (ex.: Wallet, TrendingUp, TrendingDown) */
  icon: React.ReactNode
  /** Texto do label em maiúsculas (ex.: "SALDO TOTAL") */
  text: string
  /** Valor monetário em reais (ex.: 12847.32). Para valor em centavos, passe value / 100. Quando null/undefined, exibe texto de "sem dados". */
  value?: number | null
  /** Texto exibido quando não houver valor (default: "Nenhum dado") */
  emptyLabel?: string
  /** Exibe "Carregando..." no lugar do valor */
  loading?: boolean
  className?: string
}

export function SummaryCard({
  icon,
  text,
  value,
  emptyLabel = "Nenhum dado",
  loading = false,
  className,
}: SummaryCardProps) {
  const hasValue = value != null

  const displayText = loading
    ? "Carregando..."
    : hasValue
      ? formatCurrency(value)
      : emptyLabel

  return (
    <Card className={cn("rounded-xl w-full", className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-wide text-gray-500">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center [&>svg]:h-5 [&>svg]:w-5">
            {icon}
          </span>
          <span>{text}</span>
        </div>
        <p className="mt-2 text-[1.75rem] font-bold leading-tight text-gray-800">
          {displayText}
        </p>
      </CardContent>
    </Card>
  )
}
