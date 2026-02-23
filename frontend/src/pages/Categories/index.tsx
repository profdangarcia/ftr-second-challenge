import { useEffect, useMemo } from "react"
import { Page } from "@/components/Page"
import { PageTitle } from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { CategoryInfoCard } from "./components/CategoryInfoCard"
import { useCategoriesStore } from "@/stores/categories"
import { getCategoryStats } from "@/helpers/categoryStats"
import { CATEGORY_ICON_COMPONENTS, type CategoryIconId } from "@/helpers/categoryIcons"
import { ArrowUpDown, Plus, Tag } from "lucide-react"

export function Categories() {
  const { categories, fetchCategories } = useCategoriesStore()

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

  return (
    <Page>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <PageTitle
            title="Categorias"
            description="Organize suas transações por categorias"
          />
          <Button size="sm" onClick={() => {}}>
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
      </div>
    </Page>
  )
}
