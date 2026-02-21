"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import type { Currency } from "@/lib/currencies"
import { currencies, getCurrencyName } from "@/lib/currencies"

type CurrencyContextType = {
  currency: Currency
  setCurrency: (currency: Currency) => void
  getCurrencyDisplay: () => string
  availableCurrencies: typeof currencies
}

const CurrencyContext = createContext<CurrencyContextType | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD")

  // 从 localStorage 加载货币设置
  useEffect(() => {
    const stored = localStorage.getItem("currency")
    if (stored && currencies.some((c) => c.code === stored)) {
      setCurrencyState(stored as Currency)
    } else {
      // 根据浏览器语言设置默认货币
      const browserLang = navigator.language.split("-")[0]
      let defaultCurrency: Currency = "USD"
      if (browserLang === "zh") defaultCurrency = "CNY"
      else if (browserLang === "tr") defaultCurrency = "TRY"
      else if (["fr", "es", "de", "it", "pt", "nl"].includes(browserLang)) defaultCurrency = "EUR"
      setCurrencyState(defaultCurrency)
    }
  }, [])

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr)
    localStorage.setItem("currency", curr)
  }

  const getCurrencyDisplay = () => getCurrencyName(currency)

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        getCurrencyDisplay,
        availableCurrencies: currencies,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider")
  return ctx
}
