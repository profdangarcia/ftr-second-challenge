import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client/react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useTransactionDialogStore } from "@/stores/transactionDialog"
import { useCategoriesStore } from "@/stores/categories"
import { CREATE_TRANSACTION, type CreateTransactionInput } from "@/lib/graphql/mutations/CreateTransaction"
import { UPDATE_TRANSACTION, type UpdateTransactionInput } from "@/lib/graphql/mutations/UpdateTransaction"
import { CircleArrowDownIcon, CircleArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { getGraphQLMessage } from "@/lib/utils"

const REFETCH_QUERIES: string[] = ["GetDashboardData", "ListMyTransactions"]

export function TransactionDialog() {
  const { open, mode, transaction, close } = useTransactionDialogStore()
  const { categories, fetchCategories } = useCategoriesStore()

  const [type, setType] = useState<"EXPENSE" | "INCOME">("EXPENSE")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [valueReais, setValueReais] = useState<string>("")
  const [categoryId, setCategoryId] = useState("")

  const [createTransaction, { loading: creating }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: REFETCH_QUERIES,
  })
  const [updateTransaction, { loading: updating }] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: REFETCH_QUERIES,
  })

  const loading = creating || updating

  useEffect(() => {
    if (open && categories.length === 0) {
      fetchCategories()
    }
  }, [open, categories.length, fetchCategories])

  useEffect(() => {
    if (!open) return
    if (mode === "edit" && transaction) {
      setType(transaction.type === "INCOME" ? "INCOME" : "EXPENSE")
      setDescription(transaction.description)
      setDate(transaction.date.slice(0, 10))
      setValueReais((transaction.value / 100).toFixed(2).replace(".", ","))
      setCategoryId(transaction.categoryId)
    } else {
      setType("EXPENSE")
      setDescription("")
      const today = new Date().toISOString().slice(0, 10)
      setDate(today)
      setValueReais("")
      setCategoryId("")
    }
  }, [open, mode, transaction])

  const handleOpenChange = (next: boolean) => {
    if (!next) close()
  }

  const parseValueToCents = (): number | null => {
    const normalized = valueReais.replace(",", ".").trim()
    if (!normalized) return null
    const num = Number.parseFloat(normalized)
    if (Number.isNaN(num) || num < 0) return null
    return Math.round(num * 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) {
      toast.error("Preencha a descrição.")
      return
    }
    if (!date) {
      toast.error("Selecione a data.")
      return
    }
    const valueCents = parseValueToCents()
    if (valueCents === null || valueCents === 0) {
      toast.error("Informe um valor maior que zero.")
      return
    }
    if (!categoryId) {
      toast.error("Selecione a categoria.")
      return
    }

    const dateIso = new Date(date + "T12:00:00.000Z").toISOString()

    try {
      if (mode === "create") {
        const input: CreateTransactionInput = {
          categoryId,
          type,
          description: description.trim(),
          date: dateIso,
          value: valueCents,
        }
        await createTransaction({ variables: { data: input } })
        toast.success("Transação criada.")
      } else if (transaction) {
        const input: UpdateTransactionInput = {
          categoryId,
          type,
          description: description.trim(),
          date: dateIso,
          value: valueCents,
        }
        await updateTransaction({ variables: { id: transaction.id, data: input } })
        toast.success("Transação atualizada.")
      }
      close()
    } catch (err) {
      toast.error(getGraphQLMessage(err))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogCloseButton />
        <DialogHeader className="pr-8">
          <DialogTitle>
            {mode === "edit" ? "Editar transação" : "Nova transação"}
          </DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 rounded-lg border border-gray-200 p-1">
            <button
              type="button"
              onClick={() => setType("EXPENSE")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md border py-2.5 text-sm font-medium transition-colors",
                type === "EXPENSE"
                  ? "border-red-base bg-red-50 text-gray-800"
                  : "border-transparent text-gray-600 hover:bg-gray-50"
              )}
            >
              <CircleArrowDownIcon
                className={cn("size-5 shrink-0", type === "EXPENSE" ? "text-red-base" : "text-gray-400")}
              />
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType("INCOME")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md border py-2.5 text-sm font-medium transition-colors",
                type === "INCOME"
                  ? "border-green-base bg-green-50 text-gray-800"
                  : "border-transparent text-gray-600 hover:bg-gray-50"
              )}
            >
              <CircleArrowUpIcon
                className={cn("size-5 shrink-0", type === "INCOME" ? "text-green-base" : "text-gray-400")}
              />
              Receita
            </button>
          </div>

          <Input
            label="Descrição"
            placeholder="Ex. Almoço no restaurante"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
                Data
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-4 text-base text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
                Valor
              </label>
              <div className="flex h-12 items-center rounded-md border border-gray-300 bg-white px-3">
                <span className="text-base text-gray-500">R$</span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0,00"
                  value={valueReais}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d,]/g, "").replace(/(\d+),(\d{0,2}).*/, "$1,$2")
                    setValueReais(v)
                  }}
                  className="ml-2 flex-1 border-0 bg-transparent py-4 text-base text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
              Categoria
            </label>
            <Select value={categoryId || "none"} onValueChange={(v) => setCategoryId(v === "none" ? "" : v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Selecione</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
