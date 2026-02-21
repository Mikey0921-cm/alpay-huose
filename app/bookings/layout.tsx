import type { Metadata } from "next"
import { BookingsLayoutClient } from "./layout-client"

export const metadata: Metadata = {
  title: "My Bookings – Alpay House",
  description: "View your bookings and payment status.",
}

export default function BookingsLayout({
  children,
}: { children: React.ReactNode }) {
  return <BookingsLayoutClient>{children}</BookingsLayoutClient>
}
