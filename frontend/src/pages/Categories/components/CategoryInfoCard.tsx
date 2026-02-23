import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CategoryInfoCardProps {
  /** Ícone 32x32 à esquerda do bloco de textos */
  icon: React.ReactNode
  /** Primeiro texto (ex.: "Alimentação") — usa o tamanho grande do SummaryCard */
  primaryText: string
  /** Segundo texto (ex.: "CATEGORIA MAIS UTILIZADA") — usa o tamanho pequeno do SummaryCard */
  secondaryText: string
  className?: string
}

export function CategoryInfoCard({
  icon,
  primaryText,
  secondaryText,
  className,
}: CategoryInfoCardProps) {
  return (
    <Card className={cn("rounded-xl w-full", className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center [&>svg]:h-8 [&>svg]:w-8">
            {icon}
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="text-[1.75rem] font-bold leading-tight text-gray-800">
              {primaryText}
            </p>
            <p className="text-[0.75rem] font-medium uppercase tracking-wide text-gray-500">
              {secondaryText}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
