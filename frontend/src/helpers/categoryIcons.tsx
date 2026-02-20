import {
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText,
  type LucideIcon,
} from "lucide-react"

/** Valores do enum CategoryIcon do backend (mesma key = mesmo ícone). */
export type CategoryIconId =
  | "BRIEFCASE"
  | "CAR"
  | "HEART_PULSE"
  | "PIGGY_BANK"
  | "SHOPPING_CART"
  | "TICKET"
  | "TOOL_CASE"
  | "UTENSILS"
  | "PAW_PRINT"
  | "HOUSE"
  | "GIFT"
  | "DUMBBELL"
  | "BOOK_OPEN"
  | "LUGGAGE"
  | "MAILBOX"
  | "RECEIPT"

/** Componente Lucide correspondente a cada ícone (keys = enum do banco). */
export const CATEGORY_ICON_COMPONENTS: Record<CategoryIconId, LucideIcon> = {
  BRIEFCASE: BriefcaseBusiness,
  CAR: CarFront,
  HEART_PULSE: HeartPulse,
  PIGGY_BANK: PiggyBank,
  SHOPPING_CART: ShoppingCart,
  TICKET: Ticket,
  TOOL_CASE: ToolCase,
  UTENSILS: Utensils,
  PAW_PRINT: PawPrint,
  HOUSE: House,
  GIFT: Gift,
  DUMBBELL: Dumbbell,
  BOOK_OPEN: BookOpen,
  LUGGAGE: BaggageClaim,
  MAILBOX: Mailbox,
  RECEIPT: ReceiptText,
}