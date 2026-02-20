/** Opção de período (mês/ano) para o select. value = "YYYY-MM" para uso em filtros. */
export interface PeriodOption {
  value: string
  label: string
}

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

/**
 * Gera opções de período do mês atual até 1 ano atrás.
 * Ex.: em Fevereiro/2026 retorna até Fevereiro/2025.
 */
export function getPeriodOptions(): PeriodOption[] {
  const now = new Date()
  const options: PeriodOption[] = []
  for (let i = 0; i <= 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const year = d.getFullYear()
    const month = d.getMonth()
    const value = `${year}-${String(month + 1).padStart(2, "0")}`
    const label = `${MONTH_NAMES[month]} / ${year}`
    options.push({ value, label })
  }
  return options
}

/** Valor inicial do período: mês/ano atual no formato "YYYY-MM". */
export function getCurrentPeriodValue(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
}
