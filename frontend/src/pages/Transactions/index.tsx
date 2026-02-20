import { useState } from "react"
import { useQuery } from "@apollo/client/react"
import { Page } from "@/components/Page"
import { PageTitle } from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { SearchForm, type TransactionFilters } from "./components/SearchForm"
import { LIST_MY_CATEGORIES, type ListMyCategoriesQuery } from "@/lib/graphql/queries/ListMyCategories"
import { getCurrentPeriodValue } from "./utils/periodOptions"
import { Plus } from "lucide-react"

const defaultFilters: TransactionFilters = {
  search: "",
  type: "",
  categoryId: "",
  period: getCurrentPeriodValue(),
}

export function Transactions() {
  const [filters, setFilters] = useState<TransactionFilters>(defaultFilters)
  const { data } = useQuery<ListMyCategoriesQuery>(LIST_MY_CATEGORIES)
  const categories = data?.listMyCategories ?? []

  return (
    <Page>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <PageTitle
            title="Transações"
            description="Gerencie todas as suas transações financeiras"
          />
          <Button size="sm">
            <Plus className="size-4" />
            Nova transação
          </Button>
        </div>
        <SearchForm
          categories={categories}
          value={filters}
          onChange={setFilters}
        />
      </div>
    </Page>
  )
}
