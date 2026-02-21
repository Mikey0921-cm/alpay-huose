export type Currency = "USD" | "CNY" | "TRY" | "EUR"

export const currencies: { code: Currency; name: string; symbol: string; nativeName: string }[] = [
  { code: "USD", name: "US Dollar", symbol: "$", nativeName: "$ USD" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", nativeName: "¥ CNY" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", nativeName: "₺ TRY" },
  { code: "EUR", name: "Euro", symbol: "€", nativeName: "€ EUR" },
]

// 汇率（相对于 USD，可定期更新）
const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  CNY: 7.2, // 1 USD ≈ 7.2 CNY
  TRY: 34.5, // 1 USD ≈ 34.5 TRY
  EUR: 0.92, // 1 USD ≈ 0.92 EUR
}

export function getCurrencySymbol(currency: Currency): string {
  return currencies.find((c) => c.code === currency)?.symbol || "$"
}

export function getCurrencyName(currency: Currency): string {
  return currencies.find((c) => c.code === currency)?.nativeName || "$ USD"
}

/**
 * 将美元金额转换为指定货币
 */
export function convertFromUSD(amountUSD: number, targetCurrency: Currency): number {
  return amountUSD * EXCHANGE_RATES[targetCurrency]
}

/**
 * 格式化货币金额显示
 */
export function formatCurrency(amount: number, currency: Currency, showDecimals: boolean = false): string {
  const symbol = getCurrencySymbol(currency)
  const formattedAmount = showDecimals 
    ? amount.toFixed(2) 
    : Math.round(amount).toLocaleString()
  return `${symbol}${formattedAmount}`
}
