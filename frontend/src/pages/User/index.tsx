import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/auth"
import { Page } from "@/components/Page"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, UserIcon, Mail } from "lucide-react"
import { toast } from "sonner"

export function User() {
  const { user, updateProfile, logout } = useAuthStore()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name ?? "")

  useEffect(() => {
    if (user?.name) setName(user.name)
  }, [user?.name])

  const initials = user?.name
    ? (() => {
        const trimmed = user.name.trim()
        const parts = trimmed.split(/\s+/).filter(Boolean)
        if (parts.length >= 2)
          return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2)
        return trimmed.slice(0, 2).toUpperCase() || "?"
      })()
    : "?"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      toast.error("Nome é obrigatório.")
      return
    }
    try {
      await updateProfile(trimmed)
      toast.success("Perfil atualizado.")
    } catch {
      toast.error("Erro ao atualizar perfil.")
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (!user) return null

  return (
    <Page>
      <div className="mx-auto max-w-md py-8">
        <Card>
          <CardContent className="p-6">
            {/* Top: avatar + name + email centered */}
            <div className="flex flex-col items-center pb-6 text-center">
              <Avatar className="h-20 w-20 mb-3">
                <AvatarFallback className="bg-gray-300 text-gray-800 text-2xl font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nome completo"
                  icon={<UserIcon className="size-4" />}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                />
                <Input
                  label="E-mail"
                  icon={<Mail className="size-4" />}
                  value={user.email}
                  disabled
                  helper="O e-mail não pode ser alterado"
                  className="text-muted-foreground"
                />
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Salvar alterações
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair da conta
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}
