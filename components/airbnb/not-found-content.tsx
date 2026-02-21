"use client"

import Link from "next/link"
import { useLanguage } from "@/components/i18n/language-context"

export function NotFoundContent() {
  const { t } = useLanguage()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6">
      <h1 className="text-4xl font-semibold text-foreground">{t("notFound.title")}</h1>
      <p className="text-center text-muted-foreground">
        {t("notFound.message")}
      </p>
      <Link
        href="/"
        className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:opacity-90"
      >
        {t("notFound.backHome")}
      </Link>
    </div>
  )
}
