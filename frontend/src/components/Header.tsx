import { Link, useLocation } from "react-router-dom"
import { useAuthStore } from "@/stores/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import fullLogo from "@/assets/full_logo.svg"
import { LogOut } from "lucide-react"

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const location = useLocation()

  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/transacoes", label: "Transações" },
    { to: "/categorias", label: "Categorias" },
  ]

  const initials = user?.name
    ? (() => {
        const trimmed = user.name.trim()
        const parts = trimmed.split(/\s+/).filter(Boolean)
        if (parts.length >= 2)
          return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2)
        return trimmed.slice(0, 2).toUpperCase() || "?"
      })()
    : "?"

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      {isAuthenticated && (
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src={fullLogo}
              alt="Financy"
              className="h-7 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-8">
            {navLinks.map(({ to, label }) => {
              const isActive = location.pathname === to
              return (
                <Button 
                  key={to}
                  variant="link" 
                  asChild 
                  className={`${
                    isActive
                      ? "text-primary font-bold"
                      : "text-gray-600"
                  }`}
                >
                  <Link
                    to={to}
                  >
                    {label}
                  </Link>
                </Button>
              )
            })}
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gray-300 text-gray-800 text-sm font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Button variant="link" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
