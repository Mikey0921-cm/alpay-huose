"use client"

import Link from "next/link"
import { useBookingStatus } from "@/components/airbnb/booking-status-context"
import { useLanguage } from "@/components/i18n/language-context"
import { useCurrency } from "@/components/i18n/currency-context"
import { convertFromUSD, formatCurrency } from "@/lib/currencies"
import { formatDateNumeric } from "@/lib/date-format"
import { Header } from "@/components/airbnb/header"
import { Footer } from "@/components/airbnb/footer"

export default function BookingsPage() {
  const { t, language } = useLanguage()
  const { currency } = useCurrency()
  const { bookings } = useBookingStatus()
  const formatDate = (d: Date | null) => formatDateNumeric(d, language)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-[1280px] px-6 py-10 md:px-10 lg:px-12">
        <h1 className="mb-6 text-2xl font-semibold text-foreground">
          {t("bookings.title")}
        </h1>

        {bookings.length === 0 ? (
          <p className="text-muted-foreground">{t("bookings.empty")}</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b) => {
              const displayAmount = convertFromUSD(b.totalUsd, currency)
              const displayPrice = formatCurrency(displayAmount, currency)
              const needsPayment = b.status === "payment_required" || b.status === "receipt_uploaded"
              return (
                <li
                  key={b.id}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="text-sm">
                    <span className="font-medium text-foreground">
                      {formatDate(b.checkIn)} – {formatDate(b.checkOut)}
                    </span>
                    <span className="mx-2 text-muted-foreground">·</span>
                    <span className="text-muted-foreground">
                      {b.nights} {b.nights > 1 ? t("booking.nights") : t("booking.night")}
                    </span>
                    <span className="mx-2 text-muted-foreground">·</span>
                    <span className="font-medium text-foreground">{displayPrice}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {b.status === "payment_required" && t("payment.statusPending")}
                      {b.status === "receipt_uploaded" && t("payment.statusUploaded")}
                      {b.status === "confirmed" && t("payment.statusConfirmed")}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/"
                      className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                    >
                      {t("bookings.viewListing")}
                    </Link>
                    {needsPayment && (
                      <Link
                        href="/listings/olive-grove-retreat-foca"
                        className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
                      >
                        {t("bookings.payNow")}
                      </Link>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  )
}
