"use client"

import { BookingStatusProvider } from "@/components/airbnb/booking-status-context"

export function BookingsLayoutClient({ children }: { children: React.ReactNode }) {
  return <BookingStatusProvider>{children}</BookingStatusProvider>
}
