import { Page } from "@/components/Page"
import { PageTitle } from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function Transactions() {
  return (
    <Page>
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
    </Page>
  )
}
