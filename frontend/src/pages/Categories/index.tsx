import { useEffect, useMemo, useState } from "react"
import { useMutation } from "@apollo/client/react"
import { toast } from "sonner"
import { Page } from "@/components/Page"
import { PageTitle } from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { CategoryInfoCard } from "./components/CategoryInfoCard"
import { CategoryCard } from "./components/CategoryCard"
import { useCategoriesStore } from "@/stores/categories"
import { useCategoryDialogStore } from "@/stores/categoryDialog"
import { getCategoryStats } from "@/helpers/categoryStats"
import { CATEGORY_ICON_COMPONENTS, type CategoryIconId } from "@/helpers/categoryIcons"
import {
  DELETE_CATEGORY,
  DELETE_CATEGORY_OPTIONS,
} from "@/lib/graphql/mutations/DeleteCategory"
import type { CategoryGql } from "@/lib/graphql/queries/ListMyCategories"
import { getGraphQLMessage } from "@/lib/utils"
import { ArrowUpDown, Plus, Tag } from "lucide-react"

export function Categories() {
  const { categories, fetchCategories } = useCategoriesStore()
  const openForCreate = useCategoryDialogStore((s) => s.openForCreate)
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryGql | null>(null)
  const [deleteCategory, { loading: deleting }] = useMutation(
    DELETE_CATEGORY,
    DELETE_CATEGORY_OPTIONS
  )

  useEffect(() => {
    fetchCategories() 
  }, [fetchCategories])

  const { totalCategories, totalTransactions, mostUsedCategory } = useMemo(
    () => getCategoryStats(categories),
    [categories]
  )

  const MostUsedIcon =
    mostUsedCategory && mostUsedCategory.icon in CATEGORY_ICON_COMPONENTS
      ? CATEGORY_ICON_COMPONENTS[mostUsedCategory.icon as CategoryIconId]
      : null

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return
    try {
      await deleteCategory({ variables: { id: categoryToDelete.id } })
      await fetchCategories()
      toast.success("Categoria excluída.")
    } catch (err) {
      toast.error(getGraphQLMessage(err))
      throw err
    }
  }

  return (
    <Page>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <PageTitle
            title="Categorias"
            description="Organize suas transações por categorias"
          />
          <Button size="sm" onClick={openForCreate}>
            <Plus className="size-4" />
            Nova categoria
          </Button>
        </div>
        <div className="flex gap-4">
          <CategoryInfoCard
            icon={<Tag className="text-gray-700" />}
            primaryText={String(totalCategories)}
            secondaryText="TOTAL DE CATEGORIAS"
          />
          <CategoryInfoCard
            icon={<ArrowUpDown className="text-purple-base" />}
            primaryText={String(totalTransactions)}
            secondaryText="TOTAL DE TRANSAÇÕES"
          />
          <CategoryInfoCard
            icon={
              MostUsedIcon ? (
                <MostUsedIcon
                  className={`text-${mostUsedCategory?.color?.toLowerCase()}-base`}
                />
              ) : (
                <Tag className="text-gray-700" />
              )
            }
            primaryText={mostUsedCategory?.title ?? "—"}
            secondaryText="CATEGORIA MAIS UTILIZADA"
          />
        </div>
        {categories.length === 0 ? (
          <Card className="rounded-xl py-12 text-center">
            <p className="text-sm text-gray-500">Nenhuma categoria encontrada.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onDeleteClick={setCategoryToDelete}
              />
            ))}
          </div>
        )}
      </div>
      <ConfirmDialog
        open={categoryToDelete !== null}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        title="Excluir categoria"
        description="Ao excluir esta categoria, todas as transações vinculadas a ela também serão excluídas. Esta ação não pode ser desfeita. Deseja realmente excluir?"
        confirmLabel="Excluir"
        variant="destructive"
        loading={deleting}
        onConfirm={handleConfirmDelete}
      />
    </Page>
  )
}
