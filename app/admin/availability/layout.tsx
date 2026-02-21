import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Date Management – Alpay House Admin",
  description: "Manage listing availability and blocked dates.",
}

export default function AvailabilityLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>
}
