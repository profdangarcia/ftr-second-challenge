import { Page } from "@/components/Page"
import { PageTitle } from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { CategoryInfoCard } from "./components/CategoryInfoCard"
import { ArrowUpDown, Plus, Tag, Utensils } from "lucide-react"
import { useCategoriesStore } from "@/stores/categories"
import { useEffect } from "react"

export function Categories() {
  const { categories, fetchCategories } = useCategoriesStore() 

  useEffect(() => {
    if(!categories.length) {
      fetchCategories()
    }
  }, [categories.length, fetchCategories])

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
            primaryText={String(categories.length)}
            secondaryText="TOTAL DE CATEGORIAS"
          />
          <CategoryInfoCard
            icon={<ArrowUpDown className="text-purple-base" />}
            primaryText="27"
            secondaryText="TOTAL DE TRANSACÕES"
          />
          <CategoryInfoCard
            icon={<Utensils className="text-blue-base" />}
            primaryText="Alimentação"
            secondaryText="CATEGORIA MAIS UTILIZADA"
          />
        </div>
      </div>
    </Page>
  )
}
