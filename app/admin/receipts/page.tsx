"use client"

import { useEffect, useState } from "react"
import { useBookingStatus } from "@/components/airbnb/booking-status-context"
import type { Booking, BookingStatus } from "@/components/airbnb/booking-status-context"
import type { ReceiptStatus } from "@/components/airbnb/receipt-upload"
import { CheckCircle2, XCircle, Clock, Eye, X, Calendar, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { AvailabilityDatesProvider } from "@/components/airbnb/availability-dates-context"
import { useLanguage } from "@/components/i18n/language-context"
import { formatDateTime as formatDateTimeLocale } from "@/lib/date-format"

const LISTINGS = [
  { id: "olive-grove-retreat-foca", name: "Olive Grove Retreat - Foça" },
  { id: "second-house", name: "Second House" },
  { id: "third-house", name: "Third House" },
]

function ReceiptsTab() {
  const { t, language } = useLanguage()
  const { bookings, updateBookingStatus, updateBookingReceipt } = useBookingStatus()
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "uploaded" | "verified">("all")

  const formatDate = (d: Date | null) => {
    if (!d) return "—"
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  }

  const formatDateTime = (d: Date | null) => {
    if (!d) return "—"
    const date = d instanceof Date ? d : new Date(d)
    return formatDateTimeLocale(date, language)
  }

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "payment_required":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <Clock className="h-3 w-3" />
            {t("admin.pending")}
          </span>
        )
      case "receipt_uploaded":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            <Clock className="h-3 w-3" />
            {t("admin.uploaded")}
          </span>
        )
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
            <CheckCircle2 className="h-3 w-3" />
            {t("admin.verified")}
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
            <XCircle className="h-3 w-3" />
            {t("admin.cancelled")}
          </span>
        )
      default:
        return null
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true
    if (filter === "pending") return booking.status === "payment_required"
    if (filter === "uploaded") return booking.status === "receipt_uploaded"
    if (filter === "verified") return booking.status === "confirmed"
    return true
  })

  const handleVerify = (bookingId: string) => {
    if (confirm(t("admin.confirmPayment") + "?")) {
      updateBookingStatus(bookingId, "confirmed")
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking({
          ...selectedBooking,
          status: "confirmed",
          confirmedAt: new Date(),
        })
      }
    }
  }

  const handleReject = (bookingId: string) => {
    const reason = prompt(t("admin.reject") + " " + t("admin.reason") + ":")
    if (reason) {
      const booking = bookings.find((b) => b.id === bookingId)
      if (booking?.receipt) {
        updateBookingReceipt(bookingId, {
          ...booking.receipt,
          status: "rejected",
          message: reason,
        })
      }
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking({
          ...selectedBooking,
          receipt: selectedBooking.receipt
            ? {
                ...selectedBooking.receipt,
                status: "rejected",
                message: reason,
              }
            : null,
        })
      }
    }
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("admin.receipts")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("admin.viewReceipts")}
        </p>
      </div>

      {/* 筛选器 */}
      <div className="mb-6 flex gap-2">
        {(["all", "pending", "uploaded", "verified"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {f === "all" && t("admin.all")}
            {f === "pending" && t("admin.pending")}
            {f === "uploaded" && t("admin.uploaded")}
            {f === "verified" && t("admin.verified")}
          </button>
        ))}
      </div>

      {/* 预订列表 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBookings.length === 0 ? (
          <div className="col-span-full rounded-lg border border-border bg-background p-8 text-center">
            <p className="text-muted-foreground">{t("admin.noBookings")}</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="cursor-pointer rounded-lg border border-border bg-background p-4 shadow-sm transition-shadow hover:shadow-md"
              onClick={() => setSelectedBooking(booking)}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {booking.nights} {t("admin.nights")} · {booking.guests} {t("admin.guests")}
                  </p>
                </div>
                {getStatusBadge(booking.status)}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold text-foreground">
                  ${booking.totalUsd.toLocaleString()} / {booking.totalTry.toLocaleString("tr-TR")} ₺
                </span>
                {booking.receipt && (
                  <button
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-primary hover:bg-secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedBooking(booking)
                    }}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {t("admin.viewReceipt")}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 详情模态框 */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background p-0 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center border-b border-border bg-background px-6 py-4">
              <button
                className="rounded-full p-1.5 transition-colors hover:bg-secondary"
                onClick={() => setSelectedBooking(null)}
                aria-label="关闭"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>
              <h2 className="flex-1 text-center text-lg font-semibold text-foreground">
                {t("admin.bookingDetails")}
              </h2>
              <div className="w-8" />
            </div>
            <div className="p-6 space-y-6">
              {/* 预订信息 */}
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <h3 className="mb-3 text-base font-semibold text-foreground">{t("payment.bookingInfo")}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t("admin.bookingId")}：</span>
                    <span className="ml-2 font-mono text-foreground">{selectedBooking.id}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("admin.status")}：</span>
                    <span className="ml-2">{getStatusBadge(selectedBooking.status)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("admin.checkInDate")}：</span>
                    <span className="ml-2 font-medium text-foreground">
                      {formatDate(selectedBooking.checkIn)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("admin.checkOutDate")}：</span>
                    <span className="ml-2 font-medium text-foreground">
                      {formatDate(selectedBooking.checkOut)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("admin.nights")}：</span>
                    <span className="ml-2 font-medium text-foreground">
                      {selectedBooking.nights} {t("booking.night")}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("admin.guests")}：</span>
                    <span className="ml-2 font-medium text-foreground">
                      {selectedBooking.guests} {t("booking.guest")}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">{t("admin.totalAmount")}：</span>
                    <span className="ml-2 text-lg font-semibold text-foreground">
                      ${selectedBooking.totalUsd.toLocaleString()} / {selectedBooking.totalTry.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("admin.createdAt")}：</span>
                    <span className="ml-2 text-foreground">
                      {formatDateTime(selectedBooking.createdAt)}
                    </span>
                  </div>
                  {selectedBooking.confirmedAt && (
                    <div>
                      <span className="text-muted-foreground">{t("admin.confirmedAt")}：</span>
                      <span className="ml-2 text-foreground">
                        {formatDateTime(selectedBooking.confirmedAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 客户信息 */}
              {selectedBooking.customerInfo ? (
                <div className="rounded-lg border border-border bg-background p-4">
                  <h3 className="mb-3 text-base font-semibold text-foreground">{t("admin.customerInfo")}</h3>
                  <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                    <div>
                      <span className="text-muted-foreground">{t("admin.name")}：</span>
                      <span className="ml-2 font-medium text-foreground">
                        {selectedBooking.customerInfo.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t("admin.email")}：</span>
                      <span className="ml-2 font-medium text-foreground">
                        {selectedBooking.customerInfo.email}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-muted-foreground">{t("admin.phone")}：</span>
                      <span className="ml-2 font-medium text-foreground">
                        {selectedBooking.customerInfo.phone}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    {t("admin.customerNotFilled")}
                  </p>
                </div>
              )}

              {/* 收据信息 */}
              {selectedBooking.receipt ? (
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground">{t("payment.receipt")}</h3>
                    {selectedBooking.receipt.status === "uploaded" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleVerify(selectedBooking.id)}
                          className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          {t("admin.confirmPayment")}
                        </button>
                        <button
                          onClick={() => handleReject(selectedBooking.id)}
                          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                          {t("admin.reject")}
                        </button>
                      </div>
                    )}
                  </div>
                  {selectedBooking.receipt.previewUrl && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-secondary">
                      <Image
                        src={selectedBooking.receipt.previewUrl}
                        alt={t("payment.receipt")}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {selectedBooking.receipt.uploadedAt && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      {t("payment.uploadTime")}：{formatDateTime(selectedBooking.receipt.uploadedAt)}
                    </p>
                  )}
                  {selectedBooking.receipt.message && (
                    <div className="mt-3 rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
                      <p className="text-xs text-yellow-800 dark:text-yellow-200">
                        {selectedBooking.receipt.message}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-secondary/30 p-4 text-center">
                  <p className="text-sm text-muted-foreground">{t("payment.receipt")} {t("common.notUploaded")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function AvailabilityTab() {
  const { t } = useLanguage()
  const [selectedListing, setSelectedListing] = useState(LISTINGS[0].id)
  const [selectedDates, setSelectedDates] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  })

  // 动态加载对应房源的日期管理
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(new Set())

  useEffect(() => {
    const stored = localStorage.getItem(`unavailable-dates-${selectedListing}`)
    if (stored) {
      try {
        const dates = JSON.parse(stored) as string[]
        setUnavailableDates(new Set(dates))
      } catch (err) {
        console.error("Failed to load dates:", err)
      }
    } else {
      setUnavailableDates(new Set())
    }
  }, [selectedListing])

  const dateKey = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const parseDateKey = (key: string): Date => {
    const [year, month, day] = key.split("-").map(Number)
    return new Date(year, month - 1, day)
  }

  const addDateRange = () => {
    if (!selectedDates.start || !selectedDates.end) return

    const newSet = new Set(unavailableDates)
    const start = new Date(selectedDates.start)
    const end = new Date(selectedDates.end)

    const current = new Date(start)
    while (current <= end) {
      newSet.add(dateKey(current))
      current.setDate(current.getDate() + 1)
    }

    setUnavailableDates(newSet)
    localStorage.setItem(`unavailable-dates-${selectedListing}`, JSON.stringify(Array.from(newSet)))
    setSelectedDates({ start: null, end: null })
  }

  const removeDate = (dateKey: string) => {
    const newSet = new Set(unavailableDates)
    newSet.delete(dateKey)
    setUnavailableDates(newSet)
    localStorage.setItem(`unavailable-dates-${selectedListing}`, JSON.stringify(Array.from(newSet)))
  }

  const removeDateRange = (startKey: string, endKey: string) => {
    const newSet = new Set(unavailableDates)
    const start = parseDateKey(startKey)
    const end = parseDateKey(endKey)

    const current = new Date(start)
    while (current <= end) {
      newSet.delete(dateKey(current))
      current.setDate(current.getDate() + 1)
    }

    setUnavailableDates(newSet)
    localStorage.setItem(`unavailable-dates-${selectedListing}`, JSON.stringify(Array.from(newSet)))
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "—"
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }

  const sortedDates = Array.from(unavailableDates).sort()

  // 将连续日期合并为范围
  const dateRanges: { start: string; end: string }[] = []
  let currentRange: { start: string; end: string } | null = null

  sortedDates.forEach((dateKeyStr) => {
    if (!currentRange) {
      currentRange = { start: dateKeyStr, end: dateKeyStr }
    } else {
      const prevDate = parseDateKey(currentRange.end)
      const currentDate = parseDateKey(dateKeyStr)
      const nextDay = new Date(prevDate)
      nextDay.setDate(nextDay.getDate() + 1)

      if (dateKey(nextDay) === dateKeyStr) {
        currentRange.end = dateKeyStr
      } else {
        dateRanges.push(currentRange)
        currentRange = { start: dateKeyStr, end: dateKeyStr }
      }
    }
  })
  if (currentRange) {
    dateRanges.push(currentRange)
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("admin.availability")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("admin.manageDates")}
        </p>
      </div>

      {/* 房源选择 */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-foreground">{t("admin.selectProperty")}</label>
        <select
          value={selectedListing}
          onChange={(e) => setSelectedListing(e.target.value)}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {LISTINGS.map((listing) => (
            <option key={listing.id} value={listing.id}>
              {listing.name}
            </option>
          ))}
        </select>
      </div>

      {/* 添加日期范围 */}
      <div className="mb-6 rounded-lg border border-border bg-background p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">{t("admin.addUnavailable")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t("admin.startDate")}
            </label>
            <input
              type="date"
              value={formatDate(selectedDates.start)}
              onChange={(e) =>
                setSelectedDates({
                  ...selectedDates,
                  start: e.target.value ? new Date(e.target.value) : null,
                })
              }
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t("admin.endDate")}
            </label>
            <input
              type="date"
              value={formatDate(selectedDates.end)}
              onChange={(e) =>
                setSelectedDates({
                  ...selectedDates,
                  end: e.target.value ? new Date(e.target.value) : null,
                })
              }
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <button
          onClick={addDateRange}
          disabled={!selectedDates.start || !selectedDates.end}
          className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
          {t("admin.addDateRange")}
        </button>
      </div>

      {/* 已标记的不可用日期 */}
      <div className="rounded-lg border border-border bg-background p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">{t("admin.markedUnavailable")}</h2>
        {dateRanges.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("admin.noUnavailableDates")}</p>
        ) : (
          <div className="space-y-2">
            {dateRanges.map((range, idx) => {
              const isSingleDate = range.start === range.end
              return (
                <div
                  key={`${range.start}-${range.end}`}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-2"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {isSingleDate
                        ? range.start
                        : `${range.start} ${t("admin.to")} ${range.end}`}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      isSingleDate
                        ? removeDate(range.start)
                        : removeDateRange(range.start, range.end)
                    }
                    className="rounded-md p-1.5 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                    aria-label={t("common.close")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default function AdminReceiptsPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"receipts" | "availability">("receipts")

  return (
    <AvailabilityDatesProvider listingId="admin">
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-7xl">
          {/* 标签页导航 */}
          <div className="mb-6 flex gap-2 border-b border-border">
            <button
              onClick={() => setActiveTab("receipts")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "receipts"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("admin.receipts")}
            </button>
            <button
              onClick={() => setActiveTab("availability")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "availability"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("admin.availability")}
            </button>
          </div>

          {/* 标签页内容 */}
          {activeTab === "receipts" ? <ReceiptsTab /> : <AvailabilityTab />}
        </div>
      </div>
    </AvailabilityDatesProvider>
  )
}
