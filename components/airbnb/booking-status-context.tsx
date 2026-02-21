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
import type { ReceiptData, ReceiptStatus } from "./receipt-upload"

export type BookingStatus = "pending" | "payment_required" | "receipt_uploaded" | "confirmed" | "cancelled"

export type CustomerInfo = {
  name: string
  email: string
  phone: string
}

export type Booking = {
  id: string
  checkIn: Date | null
  checkOut: Date | null
  nights: number
  guests: number
  totalUsd: number
  totalTry: number
  status: BookingStatus
  receipt: ReceiptData | null
  customerInfo: CustomerInfo | null
  createdAt: Date
  confirmedAt: Date | null
}

type BookingStatusContextType = {
  bookings: Booking[]
  currentBooking: Booking | null
  createBooking: (booking: Omit<Booking, "id" | "status" | "receipt" | "customerInfo" | "createdAt" | "confirmedAt">) => string
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void
  updateBookingReceipt: (bookingId: string, receipt: ReceiptData) => void
  updateBookingCustomerInfo: (bookingId: string, customerInfo: CustomerInfo) => void
  getBookingById: (bookingId: string) => Booking | null
}

const BookingStatusContext = createContext<BookingStatusContextType | null>(null)

export function BookingStatusProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])

  // 从 localStorage 加载预订数据
  useEffect(() => {
    const stored = localStorage.getItem("bookings")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // 转换日期字符串为 Date 对象
        const bookingsWithDates = parsed.map((b: any) => ({
          ...b,
          checkIn: b.checkIn ? new Date(b.checkIn) : null,
          checkOut: b.checkOut ? new Date(b.checkOut) : null,
          createdAt: new Date(b.createdAt),
          confirmedAt: b.confirmedAt ? new Date(b.confirmedAt) : null,
          receipt: b.receipt
            ? {
                ...b.receipt,
                uploadedAt: b.receipt.uploadedAt ? new Date(b.receipt.uploadedAt) : null,
              }
            : null,
          customerInfo: b.customerInfo || null,
        }))
        setBookings(bookingsWithDates)
      } catch (err) {
        console.error("Failed to load bookings:", err)
      }
    }
  }, [])

  // 保存到 localStorage
  const saveBookings = useCallback((newBookings: Booking[]) => {
    setBookings(newBookings)
    localStorage.setItem("bookings", JSON.stringify(newBookings))
  }, [])

  const createBooking = useCallback(
    (bookingData: Omit<Booking, "id" | "status" | "receipt" | "customerInfo" | "createdAt" | "confirmedAt">) => {
      const id = `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const newBooking: Booking = {
        ...bookingData,
        id,
        status: "payment_required",
        receipt: null,
        customerInfo: null,
        createdAt: new Date(),
        confirmedAt: null,
      }

      const updated = [...bookings, newBooking]
      saveBookings(updated)
      return id
    },
    [bookings, saveBookings]
  )

  const updateBookingStatus = useCallback(
    (bookingId: string, status: BookingStatus) => {
      const updated = bookings.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status,
            confirmedAt: status === "confirmed" ? new Date() : b.confirmedAt,
          }
        }
        return b
      })
      saveBookings(updated)
    },
    [bookings, saveBookings]
  )

  const updateBookingReceipt = useCallback(
    (bookingId: string, receipt: ReceiptData) => {
      const updated = bookings.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            receipt,
            status: "receipt_uploaded" as BookingStatus,
          }
        }
        return b
      })
      saveBookings(updated)
    },
    [bookings, saveBookings]
  )

  const updateBookingCustomerInfo = useCallback(
    (bookingId: string, customerInfo: CustomerInfo) => {
      const updated = bookings.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            customerInfo,
          }
        }
        return b
      })
      saveBookings(updated)
    },
    [bookings, saveBookings]
  )

  const getBookingById = useCallback(
    (bookingId: string) => {
      return bookings.find((b) => b.id === bookingId) || null
    },
    [bookings]
  )

  const currentBooking = useMemo(() => {
    // 返回最新的未确认预订
    const pending = bookings
      .filter((b) => b.status !== "confirmed" && b.status !== "cancelled")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    return pending[0] || null
  }, [bookings])

  const value = useMemo<BookingStatusContextType>(
    () => ({
      bookings,
      currentBooking,
      createBooking,
      updateBookingStatus,
      updateBookingReceipt,
      updateBookingCustomerInfo,
      getBookingById,
    }),
    [bookings, currentBooking, createBooking, updateBookingStatus, updateBookingReceipt, updateBookingCustomerInfo, getBookingById]
  )

  return (
    <BookingStatusContext.Provider value={value}>
      {children}
    </BookingStatusContext.Provider>
  )
}

export function useBookingStatus() {
  const ctx = useContext(BookingStatusContext)
  if (!ctx) throw new Error("useBookingStatus must be used within BookingStatusProvider")
  return ctx
}
