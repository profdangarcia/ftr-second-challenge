import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import {
  getCurrentPeriodValue,
  getPeriodOptions,
} from "../utils/periodOptions"
import { cn } from "@/lib/utils"

export interface TransactionFilters {
  search: string
  type: string
  categoryId: string
  period: string
}

export interface SearchFormCategory {
  id: string
  title: string
}

interface SearchFormProps {
  categories: SearchFormCategory[]
  value: TransactionFilters
  onChange: (filters: TransactionFilters) => void
  className?: string
}

const TYPE_OPTIONS = [
  { value: "", label: "All" },
  { value: "EXPENSE", label: "Expenses" },
  { value: "INCOME", label: "Income" },
] as const

export function SearchForm({
  categories,
  value,
  onChange,
  className,
}: SearchFormProps) {
  const periodOptions = getPeriodOptions()
  const currentPeriod = getCurrentPeriodValue()

  const update = (patch: Partial<TransactionFilters>) => {
    onChange({ ...value, ...patch })
  }

  return (
    <Card className={cn("rounded-xl", className)}>
      <CardContent className="p-6">
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          onSubmit={(e) => e.preventDefault()}
        >
        <div className="w-full">
          <Input
            label="Search"
            icon={<Search className="size-4" />}
            placeholder="Search by description"
            value={value.search}
            onChange={(e) => update({ search: e.target.value })}
          />
        </div>

        <div className="w-full space-y-2">
          <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
            Type
          </label>
          <Select
            value={value.type || "all"}
            onValueChange={(v) => update({ type: v === "all" ? "" : v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value || "all"} value={opt.value || "all"}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full space-y-2">
          <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
            Category
          </label>
          <Select
            value={value.categoryId || "all"}
            onValueChange={(v) => update({ categoryId: v === "all" ? "" : v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full space-y-2">
          <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
            Period
          </label>
          <Select
            value={value.period || currentPeriod}
            onValueChange={(v) => update({ period: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Month / Year" />
            </SelectTrigger>
            <SelectContent>
              {periodOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}
