"use client"

import { useLanguage } from "@/components/i18n/language-context"

export function HomeHero() {
  const { t } = useLanguage()
  return (
    <section className="pt-8">
      <h1 className="text-2xl font-semibold text-foreground">
        {t("home.chooseYourStay")}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {t("home.tapCardToView")}
      </p>
    </section>
  )
}
