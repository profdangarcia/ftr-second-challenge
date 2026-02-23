import { create } from "zustand"
import type { CategoryGql } from "@/lib/graphql/queries/ListMyCategories"

export type CategoryDialogMode = "create" | "edit"

interface CategoryDialogState {
  open: boolean
  mode: CategoryDialogMode
  category: CategoryGql | null
  openForCreate: () => void
  openForEdit: (category: CategoryGql) => void
  close: () => void
}

export const useCategoryDialogStore = create<CategoryDialogState>((set) => ({
  open: false,
  mode: "create",
  category: null,
  openForCreate: () =>
    set({ open: true, mode: "create", category: null }),
  openForEdit: (category) =>
    set({ open: true, mode: "edit", category }),
  close: () =>
    set({ open: false, mode: "create", category: null }),
}))
