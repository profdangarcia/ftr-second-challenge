import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
