"use client"

import { BookingStatusProvider } from "@/components/airbnb/booking-status-context"
import { AdminGate } from "@/components/airbnb/admin-gate"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGate>
      <BookingStatusProvider>
        {children}
      </BookingStatusProvider>
    </AdminGate>
  )
}
