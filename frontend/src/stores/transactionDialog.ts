import { create } from "zustand"
import type { TransactionItemGql } from "@/lib/graphql/queries/ListMyTransactions"

export type TransactionDialogMode = "create" | "edit"

interface TransactionDialogState {
  open: boolean
  mode: TransactionDialogMode
  transaction: TransactionItemGql | null
  openForCreate: () => void
  openForEdit: (transaction: TransactionItemGql) => void
  close: () => void
}

export const useTransactionDialogStore = create<TransactionDialogState>((set) => ({
  open: false,
  mode: "create",
  transaction: null,
  openForCreate: () =>
    set({ open: true, mode: "create", transaction: null }),
  openForEdit: (transaction: TransactionItemGql) =>
    set({ open: true, mode: "edit", transaction }),
  close: () =>
    set({ open: false, mode: "create", transaction: null }),
}))
