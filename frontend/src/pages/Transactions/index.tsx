import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client/react"
import { Page } from "@/components/Page"
import { PageTitle } from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { SearchForm, type TransactionFilters } from "./components/SearchForm"
import { TransactionsTable } from "./components/TransactionsTable"
import { LIST_MY_CATEGORIES, type ListMyCategoriesQuery } from "@/lib/graphql/queries/ListMyCategories"
import {
  LIST_MY_TRANSACTIONS,
  type ListMyTransactionsQuery,
  type ListMyTransactionsVariables,
} from "@/lib/graphql/queries/ListMyTransactions"
import { getCurrentPeriodValue, periodToStartEnd } from "./utils/periodOptions"
import { Plus } from "lucide-react"

const defaultFilters: TransactionFilters = {
  search: "",
  type: "",
  categoryId: "",
  period: getCurrentPeriodValue(),
}

const PAGE_SIZE = 10

export function Transactions() {
  const [filters, setFilters] = useState<TransactionFilters>(defaultFilters)
  const [page, setPage] = useState(1)

  const { data: categoriesData } = useQuery<ListMyCategoriesQuery>(LIST_MY_CATEGORIES)
  const categories = categoriesData?.listMyCategories ?? []

  const { startDate, endDate } = periodToStartEnd(filters.period)
  const variables: ListMyTransactionsVariables = {
    description: filters.search.trim() || undefined,
    type: filters.type || undefined,
    categoryId: filters.categoryId || undefined,
    startDate,
    endDate,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  }

  const { data: transactionsData } = useQuery<
    ListMyTransactionsQuery,
    ListMyTransactionsVariables
  >(LIST_MY_TRANSACTIONS, { variables })

  const items = transactionsData?.listMyTransactions?.items ?? []
  const total = transactionsData?.listMyTransactions?.total ?? 0

  useEffect(() => {
    setPage(1)
  }, [filters.search, filters.type, filters.categoryId, filters.period])

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
        <TransactionsTable
          items={items}
          categories={categories}
          total={total}
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </Page>
  )
}
