"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useLanguage } from "@/components/i18n/language-context"
import { getMonthNames, formatDateNumeric, formatDateRange } from "@/lib/date-format"
import { cn } from "@/lib/utils"

function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function isBefore(a: Date, b: Date) {
  return startOfDay(a).getTime() < startOfDay(b).getTime()
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isInRange(day: Date, start: Date, end: Date) {
  const t = startOfDay(day).getTime()
  const s = startOfDay(start).getTime()
  const e = startOfDay(end).getTime()
  return t > s && t < e
}

type Cell = { type: "empty" } | { type: "day"; day: number; date: Date }

function getMonthGrid(year: number, monthIndex: number): Cell[] {
  const cells: Cell[] = []
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  for (let i = 0; i < firstDayOfWeek; i++) cells.push({ type: "empty" })
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      type: "day",
      day,
      date: new Date(year, monthIndex, day),
    })
  }
  const remainder = cells.length % 7
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i++) cells.push({ type: "empty" })
  }
  return cells
}

export type DatePickerPopoverProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: React.ReactNode
  checkIn: Date | null
  checkOut: Date | null
  setBookingDates: (checkIn: Date | null, checkOut: Date | null) => void
  isDateUnavailable: (date: Date) => boolean
  /** Optional location suffix for title e.g. "in Foça", "in İzmir" */
  locationSuffix?: string
}

export function DatePickerPopover({
  open,
  onOpenChange,
  trigger,
  checkIn: contextCheckIn,
  checkOut: contextCheckOut,
  setBookingDates,
  isDateUnavailable,
  locationSuffix = "in Foça",
}: DatePickerPopoverProps) {
  const { t, language } = useLanguage()
  const today = useMemo(() => startOfDay(new Date()), [])
  const monthNames = useMemo(() => getMonthNames(language), [language])

  const [localCheckIn, setLocalCheckIn] = useState<Date | null>(null)
  const [localCheckOut, setLocalCheckOut] = useState<Date | null>(null)
  const [displayBase, setDisplayBase] = useState(() => {
    const d = new Date()
    d.setDate(1)
    d.setHours(0, 0, 0, 0)
    return d
  })

  // When popover opens, sync from context to local; set display to checkIn month or current month
  useEffect(() => {
    if (open) {
      setLocalCheckIn(contextCheckIn)
      setLocalCheckOut(contextCheckOut)
      if (contextCheckIn) {
        const d = new Date(contextCheckIn)
        d.setDate(1)
        d.setHours(0, 0, 0, 0)
        setDisplayBase(d)
      } else {
        const d = new Date()
        d.setDate(1)
        d.setHours(0, 0, 0, 0)
        setDisplayBase(d)
      }
    }
  }, [open, contextCheckIn, contextCheckOut])

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"]

  const leftYear = displayBase.getFullYear()
  const leftMonthIndex = displayBase.getMonth()
  const rightBase = useMemo(() => {
    const d = new Date(displayBase)
    d.setMonth(d.getMonth() + 1)
    return d
  }, [displayBase])
  const rightYear = rightBase.getFullYear()
  const rightMonthIndex = rightBase.getMonth()

  const leftGrid = useMemo(
    () => getMonthGrid(leftYear, leftMonthIndex),
    [leftYear, leftMonthIndex]
  )
  const rightGrid = useMemo(
    () => getMonthGrid(rightYear, rightMonthIndex),
    [rightYear, rightMonthIndex]
  )

  const nightsCount =
    localCheckIn && localCheckOut && isBefore(localCheckIn, localCheckOut)
      ? Math.round(
          (startOfDay(localCheckOut).getTime() -
            startOfDay(localCheckIn).getTime()) /
            (24 * 60 * 60 * 1000)
        )
      : 0
  const titleText =
    nightsCount > 0
      ? `${nightsCount} ${nightsCount > 1 ? t("booking.nights") : t("booking.night")} ${locationSuffix}`
      : t("booking.selectDates")
  const rangeText =
    nightsCount > 0 && localCheckIn && localCheckOut
      ? formatDateRange(localCheckIn, localCheckOut, language)
      : t("booking.addTravelDates")

  const handleDayClick = (date: Date) => {
    if (isBefore(date, today)) return
    if (isDateUnavailable(date)) return

    if (!localCheckIn || (localCheckIn && localCheckOut)) {
      setLocalCheckIn(date)
      setLocalCheckOut(null)
      return
    }
    if (!isBefore(localCheckIn, date)) {
      setLocalCheckIn(date)
      setLocalCheckOut(null)
      return
    }
    let cursor = new Date(localCheckIn)
    cursor.setDate(cursor.getDate() + 1)
    while (isBefore(cursor, date)) {
      if (isDateUnavailable(cursor)) {
        setLocalCheckOut(null)
        return
      }
      cursor.setDate(cursor.getDate() + 1)
    }
    setLocalCheckOut(date)
  }

  const clearDates = () => {
    setLocalCheckIn(null)
    setLocalCheckOut(null)
  }

  const handleClose = () => {
    setBookingDates(localCheckIn, localCheckOut)
    onOpenChange(false)
  }

  const goPrevMonth = () => {
    const d = new Date(displayBase)
    d.setMonth(d.getMonth() - 1)
    setDisplayBase(d)
  }

  const goNextMonth = () => {
    const d = new Date(displayBase)
    d.setMonth(d.getMonth() + 1)
    setDisplayBase(d)
  }

  const canGoPrev = useMemo(() => {
    const prev = new Date(displayBase)
    prev.setMonth(prev.getMonth() - 1)
    return prev >= new Date(today.getFullYear(), today.getMonth(), 1)
  }, [displayBase, today])

  const renderMonth = (
    grid: Cell[],
    monthName: string,
    year: number,
    monthIndex: number
  ) => (
    <div className="flex flex-col">
      <div className="mb-2 text-center text-sm font-semibold text-foreground">
        {monthName} {year}
      </div>
      <div className="mb-1 grid grid-cols-7 gap-0.5 text-center text-[10px] font-medium text-muted-foreground">
        {weekdays.map((w, idx) => (
          <div key={idx} className="h-7 leading-7">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center text-sm">
        {grid.map((cell, idx) => {
          if (cell.type === "empty") {
            return <div key={`e-${idx}`} className="h-8 w-8" />
          }
          const { date, day } = cell
          const isPast = isBefore(date, today)
          const isBooked = isDateUnavailable(date)
          const isDisabled = isPast || isBooked
          const isInRangeSelected =
            localCheckIn &&
            localCheckOut &&
            isInRange(date, localCheckIn, localCheckOut)
          const isStart = localCheckIn ? isSameDay(date, localCheckIn) : false
          const isEnd = localCheckOut ? isSameDay(date, localCheckOut) : false
          const isSingle =
            localCheckIn ? isSameDay(date, localCheckIn) && !localCheckOut : false

          let className =
            "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors"
          if (isDisabled) {
            className += " text-muted-foreground opacity-40 cursor-not-allowed"
          } else if (isStart || isEnd || isSingle) {
            className += " bg-foreground text-background font-semibold"
          } else if (isInRangeSelected) {
            className += " bg-foreground/10 text-foreground"
          } else {
            className += " text-foreground hover:bg-secondary cursor-pointer"
          }

          return (
            <div key={`${year}-${monthIndex}-${day}`} className="h-8 w-8">
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => handleDayClick(date)}
                className={cn("w-full", className)}
                aria-label={`${monthName} ${day}, ${year}`}
              >
                {day}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        className="w-auto max-w-[min(90vw,680px)] rounded-xl border border-border bg-background p-0 shadow-lg"
      >
        <div className="flex flex-col p-4">
          {/* Top: title left, date inputs right */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <section>
              <h2 className="text-base font-semibold text-foreground">
                {titleText}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{rangeText}</p>
            </section>
            <div className="flex flex-col">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                {t("booking.addDatesForPrices")}
              </p>
              <div className="flex gap-2 rounded-lg border border-border bg-muted/30 p-2">
                <div
                  className={cn(
                    "flex min-w-[120px] flex-col rounded-md border-2 px-3 py-2 transition-colors",
                    open
                      ? "border-foreground bg-background"
                      : "border-transparent bg-background/50"
                  )}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {t("booking.checkIn")}
                  </span>
                  <span className="mt-0.5 text-sm text-foreground">
                    {localCheckIn
                      ? formatDateNumeric(localCheckIn, language)
                      : "MM/DD/YYYY"}
                  </span>
                </div>
                <div className="flex min-w-[120px] flex-col rounded-md border-2 border-transparent bg-background/50 px-3 py-2">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {t("booking.checkOut")}
                  </span>
                  <span className="mt-0.5 text-sm text-foreground">
                    {localCheckOut
                      ? formatDateNumeric(localCheckOut, language)
                      : t("booking.addDate")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dual month calendar */}
          <div className="mt-6 flex gap-8">
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={goPrevMonth}
                  disabled={!canGoPrev}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
              {renderMonth(
                leftGrid,
                monthNames[leftMonthIndex],
                leftYear,
                leftMonthIndex
              )}
            </div>
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-end">
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={goNextMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              {renderMonth(
                rightGrid,
                monthNames[rightMonthIndex],
                rightYear,
                rightMonthIndex
              )}
            </div>
          </div>

          {/* Bottom: calendar icon, Clear dates, Close */}
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={clearDates}
                disabled={!localCheckIn && !localCheckOut}
                className="text-sm font-semibold text-foreground underline underline-offset-2 hover:text-muted-foreground disabled:cursor-not-allowed disabled:text-muted-foreground"
              >
                {t("booking.clearDates")}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
              >
                {t("booking.close")}
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
