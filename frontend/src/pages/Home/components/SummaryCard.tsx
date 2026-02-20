import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface SummaryCardProps {
  /** Ícone exibido ao lado do label (ex.: Wallet, TrendingUp, TrendingDown) */
  icon: React.ReactNode
  /** Texto do label em maiúsculas (ex.: "SALDO TOTAL") */
  text: string
  /** Valor monetário em reais (ex.: 12847.32). Para valor em centavos, passe value / 100 */
  value: number
  className?: string
}

export function SummaryCard({ icon, text, value, className }: SummaryCardProps) {
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
          {formatCurrency(value)}
        </p>
      </CardContent>
    </Card>
  )
}
