import { useEffect, useState } from "react"
import { useQuery, useMutation } from "@apollo/client/react"
import { toast } from "sonner"
import { Page } from "@/components/Page"
import { PageTitle } from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { SearchForm, type TransactionFilters } from "./components/SearchForm"
import { TransactionsTable } from "./components/TransactionsTable"
import { useCategoriesStore } from "@/stores/categories"
import { useTransactionDialogStore } from "@/stores/transactionDialog"
import {
  LIST_MY_TRANSACTIONS,
  type ListMyTransactionsQuery,
  type ListMyTransactionsVariables,
} from "@/lib/graphql/queries/ListMyTransactions"
import {
  DELETE_TRANSACTION,
  DELETE_TRANSACTION_OPTIONS,
} from "@/lib/graphql/mutations/DeleteTransaction"
import type { TransactionItemGql } from "@/lib/graphql/queries/ListMyTransactions"
import { getCurrentPeriodValue, periodToStartEnd } from "./utils/periodOptions"
import { getGraphQLMessage } from "@/lib/utils"
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
  const [transactionToDelete, setTransactionToDelete] = useState<TransactionItemGql | null>(null)

  const { categories, fetchCategories } = useCategoriesStore()
  const openForCreate = useTransactionDialogStore((s) => s.openForCreate)
  const [deleteTransaction, { loading: deleting }] = useMutation(DELETE_TRANSACTION, DELETE_TRANSACTION_OPTIONS)

  useEffect(() => {
    if (categories.length === 0) fetchCategories()
  }, [categories.length, fetchCategories])

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

  const handleConfirmDelete = async () => {
    if (!transactionToDelete) return
    try {
      await deleteTransaction({ variables: { id: transactionToDelete.id } })
      toast.success("Transação excluída.")
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
            title="Transações"
            description="Gerencie todas as suas transações financeiras"
          />
          <Button size="sm" onClick={openForCreate}>
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
          onDeleteClick={setTransactionToDelete}
        />
      </div>
      <ConfirmDialog
        open={transactionToDelete !== null}
        onOpenChange={(open) => !open && setTransactionToDelete(null)}
        title="Excluir transação"
        description="Esta ação não pode ser desfeita. Deseja realmente excluir esta transação?"
        confirmLabel="Excluir"
        variant="destructive"
        loading={deleting}
        onConfirm={handleConfirmDelete}
      />
    </Page>
  )
}
