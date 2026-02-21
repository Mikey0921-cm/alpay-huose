"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/i18n/language-context"

const ADMIN_AUTH_KEY = "adminAuth"
const ADMIN_PASSWORD = "admin"

export function AdminGate({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem(ADMIN_AUTH_KEY) === "true") {
      setAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    if (password === ADMIN_PASSWORD) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ADMIN_AUTH_KEY, "true")
      }
      setAuthenticated(true)
    } else {
      setError(true)
    }
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-background p-6 shadow-lg">
          <h1 className="text-lg font-semibold text-foreground">Admin</h1>
          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-foreground">
              {t("admin.passwordPlaceholder")}
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={t("admin.passwordPlaceholder")}
              autoComplete="current-password"
            />
            {error && (
              <p className="mt-1 text-xs text-red-500">{t("admin.incorrectPassword")}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-foreground py-2.5 text-sm font-medium text-background hover:opacity-90"
          >
            {t("admin.login")}
          </button>
        </form>
      </div>
    )
  }

  return <>{children}</>
}
