import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um valor numérico como Real brasileiro (R$ X.XXX,XX).
 * @param value Valor em reais (ex.: 12847.32). Se o backend enviar em centavos, passe value / 100.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

/** Formata data no formato dd/MM/yy (ex.: 01/12/25). */
export function formatShortDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
}

export function formatRelativeDate(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const diffInMs = now.getTime() - past.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInSeconds < 60) {
    return "Agora"
  }

  if (diffInMinutes < 60) {
    return `Há ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"}`
  }

  if (diffInHours < 24) {
    return `Há ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`
  }

  if (diffInDays === 1) {
    return "Ontem"
  }

  return `Há ${diffInDays} ${diffInDays === 1 ? "dia" : "dias"}`
}

/** Extrai a primeira mensagem de erro de uma resposta GraphQL/Apollo. */
export function getGraphQLMessage(error: unknown): string {
  const obj = error as { graphQLErrors?: Array<{ message?: string }>; message?: string } | null
  if (obj?.graphQLErrors?.[0]?.message) {
    return obj.graphQLErrors[0].message
  }
  if (obj?.message && typeof obj.message === "string") {
    return obj.message
  }
  return "Erro ao conectar. Tente novamente."
}
