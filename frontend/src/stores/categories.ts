import { create } from "zustand"
import { apolloClient } from "@/lib/graphql/apollo"
import { LIST_MY_CATEGORIES, type ListMyCategoriesQuery } from "@/lib/graphql/queries/ListMyCategories"
import type { CategoryGql } from "@/lib/graphql/queries/ListMyCategories"

interface CategoriesState {
  categories: CategoryGql[]
  loading: boolean
  error: unknown
  fetchCategories: () => Promise<void>
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    if (get().loading) return
    set({ loading: true, error: null })
    try {
      const { data } = await apolloClient.query<ListMyCategoriesQuery>({
        query: LIST_MY_CATEGORIES,
      })
      set({ categories: data?.listMyCategories ?? [], loading: false })
    } catch (error) {
      set({ error, loading: false, categories: [] })
    }
  },
}))
