"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

const PRICE_PER_NIGHT_USD = 51
const USD_TO_TRY = 34.5 // 1 USD ≈ 34.5 TRY，可按需或接口更新

export type BookingState = {
  checkIn: Date | null
  checkOut: Date | null
  nights: number
  totalUsd: number
  totalTry: number
  setBookingDates: (checkIn: Date | null, checkOut: Date | null) => void
}

const BookingContext = createContext<BookingState | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)

  const setBookingDates = useCallback((inDate: Date | null, outDate: Date | null) => {
    setCheckIn(inDate)
    setCheckOut(outDate)
  }, [])

  const nights = useMemo(() => {
    if (!checkIn || !checkOut || checkOut <= checkIn) return 1
    return Math.round(
      (checkOut.getTime() - checkIn.getTime()) / (24 * 60 * 60 * 1000)
    )
  }, [checkIn, checkOut])

  const totalUsd = PRICE_PER_NIGHT_USD * Math.max(1, nights)
  const totalTry = Math.round(totalUsd * USD_TO_TRY)

  const value = useMemo<BookingState>(
    () => ({
      checkIn,
      checkOut,
      nights: Math.max(1, nights),
      totalUsd,
      totalTry,
      setBookingDates,
    }),
    [checkIn, checkOut, nights, totalUsd, totalTry, setBookingDates]
  )

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking must be used within BookingProvider")
  return ctx
}

export { PRICE_PER_NIGHT_USD, USD_TO_TRY }
