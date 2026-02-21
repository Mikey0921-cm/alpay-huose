"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import {
  Star,
  ChevronDown,
  ChevronUp,
  Flag,
  X,
  Minus,
  Plus,
  Tag,
} from "lucide-react"
import { useBooking } from "@/components/airbnb/booking-context"
import { useBookingStatus } from "@/components/airbnb/booking-status-context"
import { useAvailabilityDates } from "@/components/airbnb/availability-dates-context"
import { DatePickerPopover } from "@/components/airbnb/date-picker-popover"
import { BankAccountInfo } from "@/components/airbnb/bank-account-info"
import { ReceiptUpload } from "@/components/airbnb/receipt-upload"
import { CustomerInfoForm } from "@/components/airbnb/customer-info-form"
import { useLanguage } from "@/components/i18n/language-context"
import { useCurrency } from "@/components/i18n/currency-context"
import { convertFromUSD, formatCurrency } from "@/lib/currencies"
import { formatDateNumeric, formatDateRange } from "@/lib/date-format"

export function BookingCard() {
  const { checkIn, checkOut, nights, totalUsd, totalTry, setBookingDates } = useBooking()
  const { createBooking, currentBooking, updateBookingReceipt, updateBookingCustomerInfo } = useBookingStatus()
  const { isDateUnavailable } = useAvailabilityDates()
  const { t, language } = useLanguage()
  const { currency } = useCurrency()
  const [guestsOpen, setGuestsOpen] = useState(false)
  const [guests, setGuests] = useState(1)
  const [reserveClicked, setReserveClicked] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null)
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false)
  const reserveButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!paymentModalOpen) {
      const id = setTimeout(() => reserveButtonRef.current?.focus({ preventScroll: true }), 0)
      return () => clearTimeout(id)
    }
  }, [paymentModalOpen])

  const openPaymentFromMobile = useCallback(() => {
    if (!checkIn || !checkOut) return
    setReserveClicked(true)
    const bookingId = createBooking({
      checkIn,
      checkOut,
      nights,
      guests,
      totalUsd,
      totalTry,
    })
    setCurrentBookingId(bookingId)
    setTimeout(() => {
      setReserveClicked(false)
      setPaymentModalOpen(true)
    }, 1000)
  }, [checkIn, checkOut, nights, guests, totalUsd, totalTry, createBooking])

  useEffect(() => {
    const handler = () => openPaymentFromMobile()
    window.addEventListener("open-booking-payment", handler)
    return () => window.removeEventListener("open-booking-payment", handler)
  }, [openPaymentFromMobile])

  const tryClosePaymentModal = () => {
    const hasProgress = currentBooking?.customerInfo?.name?.trim() || currentBooking?.receipt
    if (hasProgress) {
      setConfirmCloseOpen(true)
    } else {
      setPaymentModalOpen(false)
    }
  }

  const closePaymentModal = () => {
    setConfirmCloseOpen(false)
    setPaymentModalOpen(false)
  }

  // 根据选择的货币计算金额
  const displayAmount = convertFromUSD(totalUsd, currency)
  const displayPrice = formatCurrency(displayAmount, currency)

  const formatDate = (d: Date | null) => formatDateNumeric(d, language)

  const scrollToReviews = () => {
    document
      .getElementById("reviews-section")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <div className="sticky top-24 flex flex-col gap-4">
        {/* Prices include all fees badge */}
        <div className="flex w-fit items-center gap-2.5 rounded-full border border-border bg-background px-5 py-2.5 shadow-sm">
          <Tag className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {t("booking.pricesIncludeFees")}
          </span>
        </div>

        {/* Main booking card */}
        <div className="rounded-xl border border-border bg-background p-6 shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
          {/* Price + Rating */}
          <div className="mb-6 flex items-end justify-between">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[22px] font-semibold text-foreground underline decoration-foreground/60 underline-offset-2">
                  {displayPrice}
                </span>
                <span className="text-sm text-foreground">
                  {t("booking.for")} {nights} {nights > 1 ? t("booking.nights") : t("booking.night")}
                </span>
              </div>
              {currency !== "USD" && (
                <span className="text-sm text-muted-foreground">
                  ≈ ${totalUsd.toLocaleString()} USD
                </span>
              )}
            </div>
            <button
              className="flex items-center gap-1 text-xs text-foreground transition-colors hover:text-muted-foreground"
              onClick={scrollToReviews}
            >
              <Star className="h-3 w-3 fill-foreground" />
              <span className="font-medium">4.92</span>
              <span className="text-muted-foreground"> · </span>
              <span className="font-medium underline">128</span>
            </button>
          </div>

          {/* Date & Guests Picker */}
          <div className="mb-4 overflow-hidden rounded-lg border border-foreground/20">
            <DatePickerPopover
              open={dateOpen}
              onOpenChange={setDateOpen}
              trigger={
                <div className="grid grid-cols-2 cursor-pointer">
                  <div className="relative border-b border-r border-foreground/20 px-3 py-2.5 transition-colors hover:bg-secondary/50">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-foreground">
                      {t("booking.checkIn")}
                    </p>
                    <p className="mt-0.5 text-sm text-foreground">{formatDate(checkIn)}</p>
                  </div>
                  <div className="cursor-pointer border-b border-foreground/20 px-3 py-2.5 transition-colors hover:bg-secondary/50">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-foreground">
                      {t("booking.checkOut")}
                    </p>
                    <p className="mt-0.5 text-sm text-foreground">
                      {formatDate(checkOut)}
                    </p>
                  </div>
                </div>
              }
              checkIn={checkIn}
              checkOut={checkOut}
              setBookingDates={setBookingDates}
              isDateUnavailable={isDateUnavailable}
              locationSuffix="in Foça"
            />

            <div className="relative">
              <button
                className="flex w-full items-center justify-between bg-transparent px-3 py-2.5 transition-colors hover:bg-secondary/50"
                onClick={() => setGuestsOpen(!guestsOpen)}
              >
                <div>
                  <p className="text-left text-[10px] font-bold uppercase tracking-wide text-foreground">
                    {t("header.guests").toUpperCase()}
                  </p>
                  <p className="mt-0.5 text-left text-sm text-foreground">
                    {guests} {guests > 1 ? t("booking.guests") : t("booking.guest")}
                  </p>
                </div>
                {guestsOpen ? (
                  <ChevronUp className="h-5 w-5 text-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-foreground" />
                )}
              </button>
              {guestsOpen && (
                <div className="absolute left-0 right-0 top-full z-10 rounded-b-xl border border-t-0 border-border bg-background p-4 shadow-lg">
                  {[
                    { label: t("booking.adults"), desc: t("booking.age13Plus"), value: guests, min: 1, max: 4, key: "adults" },
                    { label: t("booking.children"), desc: t("booking.ages2to12"), value: 0, min: 0, max: 3, key: "children" },
                    { label: t("booking.infants"), desc: t("booking.under2"), value: 0, min: 0, max: 2, key: "infants" },
                  ].map((group) => (
                    <div
                      key={group.key}
                      className="flex items-center justify-between border-b border-border py-4 last:border-b-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {group.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {group.desc}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-transparent text-foreground transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-30"
                          onClick={() => {
                            if (group.key === "adults") setGuests(Math.max(group.min, guests - 1))
                          }}
                          disabled={group.key === "adults" ? guests <= group.min : true}
                          aria-label={`Decrease ${group.label}`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-4 text-center text-sm text-foreground">
                          {group.key === "adults" ? guests : group.value}
                        </span>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-transparent text-foreground transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-30"
                          onClick={() => {
                            if (group.key === "adults") setGuests(Math.min(group.max, guests + 1))
                          }}
                          disabled={group.key === "adults" ? guests >= group.max : false}
                          aria-label={`Increase ${group.label}`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {t("booking.guestsAndPetsNote")}
                  </p>
                  <button
                    className="mt-3 text-sm font-semibold text-foreground underline"
                    onClick={() => setGuestsOpen(false)}
                  >
                    {t("booking.close")}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reserve Button */}
          <button
            ref={reserveButtonRef}
            className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#E51D53] to-[#D70466] py-3.5 text-base font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              if (!checkIn || !checkOut) {
                alert(t("booking.selectDates"))
                return
              }
              setReserveClicked(true)
              const bookingId = createBooking({
                checkIn,
                checkOut,
                nights,
                guests,
                totalUsd,
                totalTry,
              })
              setCurrentBookingId(bookingId)
              setTimeout(() => {
                setReserveClicked(false)
                setPaymentModalOpen(true)
              }, 1000)
            }}
            disabled={!checkIn || !checkOut || reserveClicked}
          >
            {reserveClicked ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t("booking.reserving")}
              </span>
            ) : (
              t("booking.reserve")
            )}
          </button>

          <p className="mt-3.5 text-center text-sm text-muted-foreground">
            {t("booking.wontBeCharged")}
          </p>

          {/* Report */}
          <div className="mt-6 flex items-center justify-center gap-1.5">
            <Flag className="h-4 w-4 text-muted-foreground" />
            <button
              className="text-sm text-muted-foreground underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground"
              onClick={() => setReportOpen(true)}
            >
              Report this listing
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal (portal so it shows on mobile when card is hidden) */}
      {typeof document !== "undefined" &&
        paymentModalOpen &&
        currentBookingId &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4"
            onClick={tryClosePaymentModal}
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background p-0 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="sticky top-0 z-10 border-b border-border bg-background px-6 py-4">
              <div className="flex items-center">
                <button
                  className="rounded-full p-1.5 transition-colors hover:bg-secondary"
                  onClick={tryClosePaymentModal}
                  aria-label={t("booking.close")}
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
                <h2 className="flex-1 text-center text-lg font-semibold text-foreground">
                  {t("payment.completePayment")}
                </h2>
                <div className="w-8" />
              </div>
              {/* 步骤提示 */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>{t("payment.stepContact")}</span>
                <span>→</span>
                <span>{t("payment.stepTransfer")}</span>
                <span>→</span>
                <span>{t("payment.stepReceipt")}</span>
              </div>
              {currentBooking?.status && currentBooking.status !== "payment_required" && (
                <div className="mt-2 flex justify-center">
                  <span className="inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                    {currentBooking.status === "receipt_uploaded" && t("payment.statusUploaded")}
                    {currentBooking.status === "confirmed" && t("payment.statusConfirmed")}
                    {currentBooking.status === "cancelled" && t("admin.cancelled")}
                  </span>
                </div>
              )}
            </div>
            <div className="p-6 space-y-6">
              {/* 预订信息摘要 */}
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <h3 className="mb-3 text-base font-semibold text-foreground">{t("payment.bookingInfo")}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("payment.checkInDate")}：</span>
                    <span className="font-medium text-foreground">{formatDate(checkIn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("payment.checkOutDate")}：</span>
                    <span className="font-medium text-foreground">{formatDate(checkOut)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("payment.nights")}：</span>
                    <span className="font-medium text-foreground">{nights} {t("booking.night")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("payment.guests")}：</span>
                    <span className="font-medium text-foreground">{guests} {t("booking.guest")}</span>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-border pt-3">
                    <span className="text-base font-semibold text-foreground">{t("payment.totalAmount")}：</span>
                    <span className="text-lg font-semibold text-foreground">
                      {displayPrice}
                      {currency !== "USD" && (
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          (≈ ${totalUsd.toLocaleString()} USD)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* 客户信息表单 */}
              <CustomerInfoForm
                bookingId={currentBookingId}
                existingInfo={currentBooking?.customerInfo || null}
                onSave={(info) => {
                  updateBookingCustomerInfo(currentBookingId, info)
                }}
              />

              {/* 银行账户信息 */}
              <BankAccountInfo
                amountText={displayPrice}
                reference={currentBookingId}
              />

              {/* 收据上传 */}
              <ReceiptUpload
                bookingId={currentBookingId}
                hasContactInfo={!!currentBooking?.customerInfo?.name?.trim()}
                onUploadComplete={(receipt) => {
                  updateBookingReceipt(currentBookingId, receipt)
                }}
                existingReceipt={currentBooking?.receipt || null}
              />
            </div>

            {/* 关闭前确认 */}
            {confirmCloseOpen && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-foreground/40 p-4">
                <div className="w-full max-w-sm rounded-xl border border-border bg-background p-6 shadow-xl">
                  <p className="mb-4 text-sm text-foreground">
                    {t("payment.confirmLeave")}
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setConfirmCloseOpen(false)}
                      className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                    >
                      {t("payment.stay")}
                    </button>
                    <button
                      type="button"
                      onClick={closePaymentModal}
                      className="flex-1 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90"
                    >
                      {t("payment.leave")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>,
          document.body
        )}

      {/* Report Modal */}
      {reportOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm"
          onClick={() => setReportOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-background p-0 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-b border-border px-6 py-4">
              <button
                className="rounded-full p-1.5 transition-colors hover:bg-secondary"
                onClick={() => setReportOpen(false)}
                aria-label="Close report dialog"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>
              <h2 className="flex-1 text-center text-base font-semibold text-foreground">
                Report this listing
              </h2>
              <div className="w-8" />
            </div>
            <div className="p-6">
              <p className="mb-4 text-sm text-muted-foreground">Why are you reporting this listing?</p>
              <div className="flex flex-col gap-0">
                {[
                  "It's inaccurate or incorrect",
                  "It's not a real place to stay",
                  "It's a scam",
                  "It's offensive",
                  "Something else",
                ].map((reason) => (
                  <button
                    key={reason}
                    className="flex w-full items-center justify-between border-b border-border bg-transparent px-1 py-4 text-left text-sm text-foreground transition-colors hover:bg-secondary/50 last:border-b-0"
                    onClick={() => setReportOpen(false)}
                  >
                    {reason}
                    <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
