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
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useAuthStore } from "@/stores/auth"
import { getGraphQLMessage } from "@/lib/utils"
import { toast } from "sonner"

import fullLogo from "@/assets/full_logo.svg"

export function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const signup = useAuthStore((state) => state.signup)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const ok = await signup({ name, email, password })
      if (ok) {
        toast.success("Account created successfully!")
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
          <CardTitle className="text-2xl font-bold text-gray-800">
            Create account
          </CardTitle>
          <CardDescription className="text-gray-500">
            Start managing your finances today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full name"
              icon={<User className="size-4" />}
              id="name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="E-mail"
              icon={<Mail className="size-4" />}
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <Input
                label="Password"
                icon={<Lock className="size-4" />}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helper="Password must be at least 8 characters long"
                required
                minLength={8}
                className="pr-12"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute right-1 top-[3.375rem] h-8 w-8 -translate-y-1/2 border-0 bg-transparent shadow-none text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              Sign up
            </Button>
          </form>
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-card px-2 text-xs text-gray-500">
              or
            </span>
          </div>
          <p className="text-center text-sm text-gray-600">
            Already have an account?
          </p>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/login" className="inline-flex items-center gap-2">
              <ArrowRight className="size-4" />
              Sign in
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
