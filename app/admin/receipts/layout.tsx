import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Receipt Management – Alpay House Admin",
  description: "View and manage customer payment receipts.",
}

export default function ReceiptsLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>
}
