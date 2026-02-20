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

export type CategoryIconId =
  | "briefcase"
  | "car"
  | "heart-pulse"
  | "piggy-bank"
  | "shopping-cart"
  | "ticket"
  | "tool-case"
  | "utensils"
  | "paw-print"
  | "house"
  | "gift"
  | "dumbbell"
  | "book-open"
  | "luggage"
  | "mailbox"
  | "receipt"

/** Componente Lucide correspondente a cada ícone. */
export const CATEGORY_ICON_COMPONENTS: Record<CategoryIconId, LucideIcon> = {
  briefcase: BriefcaseBusiness,
  car: CarFront,
  "heart-pulse": HeartPulse,
  "piggy-bank": PiggyBank,
  "shopping-cart": ShoppingCart,
  ticket: Ticket,
  "tool-case": ToolCase,
  utensils: Utensils,
  "paw-print": PawPrint,
  house: House,
  gift: Gift,
  dumbbell: Dumbbell,
  "book-open": BookOpen,
  luggage: BaggageClaim,
  mailbox: Mailbox,
  receipt: ReceiptText,
}