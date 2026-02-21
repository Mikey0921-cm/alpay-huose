"use client"

import { useState, useEffect } from "react"
import { Calendar, X, Plus, Trash2 } from "lucide-react"
import { AvailabilityDatesProvider } from "@/components/airbnb/availability-dates-context"

const LISTINGS = [
  { id: "olive-grove-retreat-foca", name: "Olive Grove Retreat - Foça" },
  { id: "second-house", name: "Second House" },
  { id: "third-house", name: "Third House" },
]

function AdminAvailabilityContent() {
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

  sortedDates.forEach((dateKey) => {
    if (!currentRange) {
      currentRange = { start: dateKey, end: dateKey }
    } else {
      const prevDate = parseDateKey(currentRange.end)
      const currentDate = parseDateKey(dateKey)
      const nextDay = new Date(prevDate)
      nextDay.setDate(nextDay.getDate() + 1)

      if (dateKey(nextDay) === dateKey) {
        currentRange.end = dateKey
      } else {
        dateRanges.push(currentRange)
        currentRange = { start: dateKey, end: dateKey }
      }
    }
  })
  if (currentRange) {
    dateRanges.push(currentRange)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">日期管理</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            管理各房源的不可用日期
          </p>
        </div>

        {/* 房源选择 */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">选择房源</label>
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
          <h2 className="mb-4 text-lg font-semibold text-foreground">添加不可用日期</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                开始日期
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
                结束日期
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
            添加日期范围
          </button>
        </div>

        {/* 已标记的不可用日期 */}
        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="mb-4 text-lg font-semibold text-foreground">已标记的不可用日期</h2>
          {dateRanges.length === 0 ? (
            <p className="text-sm text-muted-foreground">暂无不可用日期</p>
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
                          : `${range.start} 至 ${range.end}`}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        isSingleDate
                          ? removeDate(range.start)
                          : removeDateRange(range.start, range.end)
                      }
                      className="rounded-md p-1.5 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                      aria-label="删除日期"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminAvailabilityPage() {
  return (
    <AvailabilityDatesProvider listingId="admin">
      <AdminAvailabilityContent />
    </AvailabilityDatesProvider>
  )
}
