"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

const PRICE_PER_NIGHT_USD = 138
const USD_TO_TRY = 34.5

export type BookingState = {
  checkIn: Date | null
  checkOut: Date | null
  nights: number
  totalUsd: number
  totalTry: number
  setBookingDates: (checkIn: Date | null, checkOut: Date | null) => void
}

const BookingContext = createContext<BookingState | null>(null)

export function BookingProviderThirdHouse({ children }: { children: ReactNode }) {
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

export function useBookingThirdHouse() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBookingThirdHouse must be used within BookingProviderThirdHouse")
  return ctx
}
