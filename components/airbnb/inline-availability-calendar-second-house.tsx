"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useBookingSecondHouse } from "@/components/airbnb/booking-context-second-house"
import { useAvailabilityDates } from "@/components/airbnb/availability-dates-context"
import { useLanguage } from "@/components/i18n/language-context"
import { getMonthNames, formatDateRange } from "@/lib/date-format"

function dateKey(d: Date) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

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

export function InlineAvailabilityCalendarSecondHouse() {
  const { t, language } = useLanguage()
  const { setBookingDates } = useBookingSecondHouse()
  const { isDateUnavailable } = useAvailabilityDates()
  const today = useMemo(() => startOfDay(new Date()), [])
  const monthNames = useMemo(() => getMonthNames(language), [language])

  const [displayBase, setDisplayBase] = useState(() => {
    const d = new Date()
    d.setDate(1)
    d.setHours(0, 0, 0, 0)
    return d
  })

  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"]

  const year = displayBase.getFullYear()
  const monthIndex = displayBase.getMonth()
  const monthName = monthNames[monthIndex]
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay()

  const { titleText, rangeText, nights } = useMemo(() => {
    if (!checkIn || !checkOut || !isBefore(checkIn, checkOut)) {
      return {
        titleText: t("booking.selectDates"),
        rangeText: t("booking.addTravelDates"),
        nights: 0,
      }
    }
    const nightsCount = Math.round(
      (startOfDay(checkOut).getTime() - startOfDay(checkIn).getTime()) /
        (24 * 60 * 60 * 1000)
    )
    return {
      titleText: `${nightsCount} ${nightsCount > 1 ? t("booking.nights") : t("booking.night")} in Foça`,
      rangeText: formatDateRange(checkIn, checkOut, language),
      nights: nightsCount,
    }
  }, [checkIn, checkOut, language, t])

  const grid = useMemo(() => {
    const cells: ({ type: "empty" } | { type: "day"; day: number; date: Date })[] = []
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push({ type: "empty" })
    }
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
  }, [year, monthIndex, daysInMonth, firstDayOfWeek])

  const handleDayClick = (date: Date) => {
    if (isBefore(date, today)) return
    if (isDateUnavailable(date)) return

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date)
      setCheckOut(null)
      return
    }

    if (!isBefore(checkIn, date)) {
      setCheckIn(date)
      setCheckOut(null)
      return
    }

    let cursor = new Date(checkIn)
    cursor.setDate(cursor.getDate() + 1)
    while (isBefore(cursor, date)) {
      if (isDateUnavailable(cursor)) {
        setCheckOut(null)
        return
      }
      cursor.setDate(cursor.getDate() + 1)
    }
    setCheckOut(date)
  }

  const clearDates = () => {
    setCheckIn(null)
    setCheckOut(null)
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

  useEffect(() => {
    setBookingDates(checkIn, checkOut)
  }, [checkIn, checkOut, setBookingDates])

  const canGoPrev = useMemo(() => {
    const prev = new Date(displayBase)
    prev.setMonth(prev.getMonth() - 1)
    return prev >= new Date(today.getFullYear(), today.getMonth(), 1)
  }, [displayBase, today])

  return (
    <div
      data-testid="inline-availability-calendar"
      className="mt-8 rounded-2xl border border-border bg-background"
    >
      <div className="flex flex-col gap-1 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <section>
          <h2
            tabIndex={-1}
            className="text-base font-semibold text-foreground md:text-lg"
          >
            {titleText}
          </h2>
        </section>
        <div className="text-sm text-muted-foreground">{rangeText}</div>
      </div>

      <div className="border-t border-border px-4 pb-4 pt-2">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            onClick={goPrevMonth}
            disabled={!canGoPrev}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h3 className="text-sm font-semibold text-foreground">
            {monthName} {year}
          </h3>
          <button
            type="button"
            aria-label="Next month"
            onClick={goNextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-1 grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
          {weekdays.map((w, idx) => (
            <div key={idx} className="py-1">
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 text-center text-sm">
          {grid.map((cell, idx) => {
            if (cell.type === "empty") {
              return <div key={`e-${idx}`} className="h-10" />
            }

            const { date } = cell
            const day = cell.day
            const isPast = isBefore(date, today)
            const isBooked = isDateUnavailable(date)
            const isDisabled = isPast || isBooked
            const isInRangeSelected =
              checkIn &&
              checkOut &&
              isInRange(date, checkIn, checkOut)
            const isStart = checkIn ? isSameDay(date, checkIn) : false
            const isEnd = checkOut ? isSameDay(date, checkOut) : false
            const isSingle = checkIn ? isSameDay(date, checkIn) && !checkOut : false

            let className =
              "mx-auto flex h-10 w-10 items-center justify-center rounded-full transition-colors"
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
              <div key={dateKey(date)} className="py-1">
                <button
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDayClick(date)}
                  className={className}
                  aria-label={`${monthName} ${day}, ${year}${isDisabled ? ", unavailable" : ""}`}
                >
                  {day}
                </button>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={clearDates}
          disabled={!checkIn && !checkOut}
          className="mt-3 text-xs font-semibold underline underline-offset-2 disabled:cursor-not-allowed disabled:text-muted-foreground text-foreground hover:text-muted-foreground"
        >
          Clear dates
        </button>
      </div>
    </div>
  )
}
