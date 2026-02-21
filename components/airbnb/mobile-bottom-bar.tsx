"use client"

import { Star } from "lucide-react"
import { useState } from "react"
import { useBooking } from "@/components/airbnb/booking-context"
import { useLanguage } from "@/components/i18n/language-context"
import { useCurrency } from "@/components/i18n/currency-context"
import { convertFromUSD, formatCurrency } from "@/lib/currencies"

export function MobileBottomBar() {
  const { t } = useLanguage()
  const { currency } = useCurrency()
  const { checkIn, checkOut, totalUsd, totalTry, nights } = useBooking()
  const [reserving, setReserving] = useState(false)

  // 根据选择的货币计算金额
  const displayAmount = convertFromUSD(totalUsd, currency)
  const displayPrice = formatCurrency(displayAmount, currency)

  const scrollToReviews = () => {
    document
      .getElementById("reviews-section")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-border bg-background px-4 py-3 lg:hidden">
      <div>
        <div className="flex items-center gap-1">
          <span className="text-base font-semibold text-foreground underline">
            {displayPrice}
          </span>
          <span className="text-sm text-foreground">
            {nights} {nights > 1 ? t("booking.nights") : t("booking.night")}
          </span>
        </div>
        {currency !== "USD" && (
          <div className="text-xs text-muted-foreground">
            ≈ ${totalUsd.toLocaleString()} USD
          </div>
        )}
        <div className="flex items-center gap-1 text-xs">
          <Star className="h-3 w-3 fill-foreground text-foreground" />
          <span className="font-medium text-foreground">4.92</span>
          <span className="text-muted-foreground"> · </span>
          <button
            className="font-medium text-muted-foreground underline transition-colors hover:text-foreground"
            onClick={scrollToReviews}
          >
            128 {t("common.reviews")}
          </button>
        </div>
      </div>
      <button
        className="rounded-lg bg-gradient-to-r from-primary to-primary/80 px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:from-primary/90 hover:to-primary/70 active:scale-[0.97]"
        onClick={() => {
          if (!checkIn || !checkOut) {
            alert(t("booking.selectDates"))
            return
          }
          setReserving(true)
          window.dispatchEvent(new CustomEvent("open-booking-payment"))
          setTimeout(() => setReserving(false), 1000)
        }}
      >
        {reserving ? t("booking.reserving") : t("booking.reserve")}
      </button>
    </div>
  )
}
