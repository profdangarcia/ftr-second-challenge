import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react"
import { useAuthStore } from "@/stores/auth"
import { getGraphQLMessage } from "@/lib/utils"
import { toast } from "sonner"

import fullLogo from "@/assets/full_logo.svg"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const ok = await login({ email, password })
      if (ok) {
        toast.success("Login realizado com sucesso!")
      }
    } catch (error) {
      toast.error(getGraphQLMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 bg-gray-100 px-4 py-8">
      <img
        src={fullLogo}
        alt="Financy"
        className="h-8 w-auto shrink-0"
      />
      <Card className="w-full max-w-md rounded-xl shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-gray-800">
            Fazer login
          </CardTitle>
          <CardDescription className="text-gray-500 text-md">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail"
              icon={<Mail className="size-4" />}
              id="email"
              type="email"
              placeholder="mail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <Input
                label="Senha"
                icon={<Lock className="size-4" />}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-12"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute right-1 top-[3.375rem] h-8 w-8 -translate-y-1/2 border-0 bg-transparent shadow-none text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-200 text-primary focus:ring-primary"
                />
                Lembrar-me
              </label>
              <Button variant="link">
                Recuperar senha
              </Button>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              Entrar
            </Button>
          </form>
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-card px-2 text-xs text-gray-500">
              ou
            </span>
          </div>
          <p className="text-center text-sm text-gray-600">
            Ainda não tem uma conta?
          </p>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/signup" className="inline-flex items-center gap-2">
              <UserPlus className="size-4" />
              Criar conta
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
