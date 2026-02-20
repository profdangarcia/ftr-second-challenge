import { Toaster } from "@/components/ui/sonner"
import { Header } from "./Header"
import { TransactionDialog } from "./TransactionDialog"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="mx-auto px-6 pt-12 pb-6 max-w-7xl">{children}</main>
      <TransactionDialog />
      <Toaster />
    </div>
  )
}
