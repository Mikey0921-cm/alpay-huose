"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type AvailabilityDatesContextType = {
  unavailableDates: Set<string>
  addUnavailableDate: (date: Date) => void
  removeUnavailableDate: (date: Date) => void
  addUnavailableDateRange: (startDate: Date, endDate: Date) => void
  removeUnavailableDateRange: (startDate: Date, endDate: Date) => void
  isDateUnavailable: (date: Date) => boolean
}

const AvailabilityDatesContext = createContext<AvailabilityDatesContextType | null>(null)

// 将日期转换为 YYYY-MM-DD 格式的字符串
const dateKey = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function AvailabilityDatesProvider({
  children,
  listingId,
}: {
  children: ReactNode
  listingId: string
}) {
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(new Set())

  // 从 localStorage 加载不可用日期
  useEffect(() => {
    const stored = localStorage.getItem(`unavailable-dates-${listingId}`)
    if (stored) {
      try {
        const dates = JSON.parse(stored) as string[]
        setUnavailableDates(new Set(dates))
      } catch (err) {
        console.error("Failed to load unavailable dates:", err)
      }
    }
  }, [listingId])

  // 保存到 localStorage
  const saveDates = useCallback(
    (dates: Set<string>) => {
      setUnavailableDates(dates)
      localStorage.setItem(`unavailable-dates-${listingId}`, JSON.stringify(Array.from(dates)))
    },
    [listingId]
  )

  const addUnavailableDate = useCallback(
    (date: Date) => {
      const key = dateKey(date)
      const newSet = new Set(unavailableDates)
      newSet.add(key)
      saveDates(newSet)
    },
    [unavailableDates, saveDates]
  )

  const removeUnavailableDate = useCallback(
    (date: Date) => {
      const key = dateKey(date)
      const newSet = new Set(unavailableDates)
      newSet.delete(key)
      saveDates(newSet)
    },
    [unavailableDates, saveDates]
  )

  const addUnavailableDateRange = useCallback(
    (startDate: Date, endDate: Date) => {
      const newSet = new Set(unavailableDates)
      const current = new Date(startDate)
      while (current <= endDate) {
        newSet.add(dateKey(current))
        current.setDate(current.getDate() + 1)
      }
      saveDates(newSet)
    },
    [unavailableDates, saveDates]
  )

  const removeUnavailableDateRange = useCallback(
    (startDate: Date, endDate: Date) => {
      const newSet = new Set(unavailableDates)
      const current = new Date(startDate)
      while (current <= endDate) {
        newSet.delete(dateKey(current))
        current.setDate(current.getDate() + 1)
      }
      saveDates(newSet)
    },
    [unavailableDates, saveDates]
  )

  const isDateUnavailable = useCallback(
    (date: Date) => {
      return unavailableDates.has(dateKey(date))
    },
    [unavailableDates]
  )

  const value = useMemo<AvailabilityDatesContextType>(
    () => ({
      unavailableDates,
      addUnavailableDate,
      removeUnavailableDate,
      addUnavailableDateRange,
      removeUnavailableDateRange,
      isDateUnavailable,
    }),
    [
      unavailableDates,
      addUnavailableDate,
      removeUnavailableDate,
      addUnavailableDateRange,
      removeUnavailableDateRange,
      isDateUnavailable,
    ]
  )

  return (
    <AvailabilityDatesContext.Provider value={value}>
      {children}
    </AvailabilityDatesContext.Provider>
  )
}

export function useAvailabilityDates() {
  const ctx = useContext(AvailabilityDatesContext)
  if (!ctx) throw new Error("useAvailabilityDates must be used within AvailabilityDatesProvider")
  return ctx
}
